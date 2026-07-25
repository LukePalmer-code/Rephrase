from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.db.models import User

router = APIRouter(tags=["me"])


@router.get("/me")
def read_current_user(user: User = Depends(get_current_user)) -> dict:
    """Return the logged-in user. Mainly here to prove the auth flow works end
    to end; Phase 2 will expand this (e.g. PATCH /me)."""
    return {"id": user.id, "email": user.email}
