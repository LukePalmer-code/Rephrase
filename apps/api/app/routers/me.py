from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import User
from app.db.session import get_db
from app.schemas.me import UserRead, UserUpdate

router = APIRouter(tags=["me"])


@router.get("/me", response_model=UserRead)
def read_current_user(user: User = Depends(get_current_user)) -> User:
    """Return the logged-in user. Mainly here to prove the auth flow works end
    to end; Phase 2 will expand this (e.g. PATCH /me)."""
    return user


@router.patch("/me", response_model=UserRead)
def update_current_user(
    payload: UserUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    """Update editable profile fields. Only fields the caller actually sent
    are touched (`exclude_unset`) — omitting a field leaves it unchanged."""
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    db.commit()
    db.refresh(user)
    return user
