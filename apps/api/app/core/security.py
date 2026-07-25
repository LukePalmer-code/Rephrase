"""JWT validation against AWS Cognito, and the `get_current_user` dependency.

How this works, broadly:
1. The frontend signs a user in directly against Cognito and gets back an
   ID token (a JWT). It sends that token as `Authorization: Bearer <token>`
   on every API request.
2. Cognito publishes its public signing keys at a well-known JWKS URL. We
   fetch those keys (and cache them) instead of trusting the token blindly.
3. We verify the token's signature, issuer, audience and expiry using those
   keys. If it all checks out, we trust the `sub` (Cognito's stable user id)
   and `email` claims inside it.
4. `get_current_user` then loads (or, on first login, creates) the matching
   `User` row in our own database, keyed by that `sub`.
"""

from functools import lru_cache

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from jose.exceptions import JWTError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.models import User
from app.db.session import get_db

bearer_scheme = HTTPBearer()

COGNITO_ISSUER = (
    f"https://cognito-idp.{settings.cognito_region}.amazonaws.com/"
    f"{settings.cognito_user_pool_id}"
)
JWKS_URL = f"{COGNITO_ISSUER}/.well-known/jwks.json"


@lru_cache
def _get_jwks() -> dict:
    """Fetch Cognito's public signing keys. Cached for the process lifetime."""
    response = httpx.get(JWKS_URL, timeout=5)
    response.raise_for_status()
    return response.json()


def _decode_id_token(token: str) -> dict:
    try:
        unverified_header = jwt.get_unverified_header(token)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token header"
        ) from exc

    signing_key = next(
        (key for key in _get_jwks()["keys"] if key["kid"] == unverified_header.get("kid")),
        None,
    )
    if signing_key is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unknown signing key"
        )

    try:
        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            issuer=COGNITO_ISSUER,
            audience=settings.cognito_app_client_id,
        )
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        ) from exc

    if claims.get("token_use") != "id":
        # Only ID tokens carry the email claim we need to create a user row;
        # reject access tokens here so callers don't send the wrong one.
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Expected an ID token"
        )

    return claims


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    claims = _decode_id_token(credentials.credentials)
    sub = claims["sub"]
    email = claims.get("email", "")

    user = db.get(User, sub)
    if user is None:
        user = User(id=sub, email=email)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
