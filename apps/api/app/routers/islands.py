from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import Island, Sentence, User
from app.db.session import get_db
from app.schemas.islands import IslandRead

router = APIRouter(tags=["islands"])


def _to_island_read(island: Island, sentence_count: int) -> IslandRead:
    return IslandRead(
        id=island.id,
        name=island.name,
        description=island.description,
        sentence_count=sentence_count,
        created_at=island.created_at,
    )


@router.get("/islands", response_model=list[IslandRead])
def list_islands(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[IslandRead]:
    """One row per island the user owns, each with its live sentence count."""
    rows = db.execute(
        select(Island, func.count(Sentence.id))
        .outerjoin(Sentence, Sentence.island_id == Island.id)
        .where(Island.user_id == user.id)
        .group_by(Island.id)
        .order_by(Island.created_at.desc())
    ).all()
    return [_to_island_read(island, count) for island, count in rows]


@router.get("/islands/{island_id}", response_model=IslandRead)
def get_island(
    island_id: UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> IslandRead:
    island = db.get(Island, island_id)
    if island is None or island.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Island not found")

    count = db.scalar(select(func.count(Sentence.id)).where(Sentence.island_id == island.id))
    return _to_island_read(island, count or 0)
