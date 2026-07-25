from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import Sentence, User
from app.db.session import get_db
from app.schemas.sentences import SentenceRead

router = APIRouter(tags=["sentences"])


@router.get("/sentences", response_model=list[SentenceRead])
def list_sentences(
    island_id: UUID | None = Query(
        default=None, description="Filter to one island (playlist view)"
    ),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Sentence]:
    stmt = select(Sentence).where(Sentence.user_id == user.id)
    if island_id is not None:
        stmt = stmt.where(Sentence.island_id == island_id)
    stmt = stmt.order_by(Sentence.created_at.desc()).limit(limit).offset(offset)
    return list(db.scalars(stmt))
