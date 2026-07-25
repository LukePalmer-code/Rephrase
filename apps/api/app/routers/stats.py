from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import Island, Review, ReviewCorrectness, Sentence, User
from app.db.session import get_db
from app.schemas.stats import StatsRead

router = APIRouter(tags=["stats"])


@router.get("/stats", response_model=StatsRead)
def read_stats(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> StatsRead:
    island_count = db.scalar(select(func.count(Island.id)).where(Island.user_id == user.id)) or 0
    sentence_count = (
        db.scalar(select(func.count(Sentence.id)).where(Sentence.user_id == user.id)) or 0
    )
    review_count = db.scalar(select(func.count(Review.id)).where(Review.user_id == user.id)) or 0
    judged_count = (
        db.scalar(
            select(func.count(Review.id)).where(
                Review.user_id == user.id, Review.correctness.is_not(None)
            )
        )
        or 0
    )
    correct_count = (
        db.scalar(
            select(func.count(Review.id)).where(
                Review.user_id == user.id,
                Review.correctness.in_([ReviewCorrectness.EXACT, ReviewCorrectness.CLOSE]),
            )
        )
        or 0
    )
    recall_accuracy = (correct_count / judged_count) if judged_count > 0 else None

    return StatsRead(
        island_count=island_count,
        sentence_count=sentence_count,
        review_count=review_count,
        recall_accuracy=recall_accuracy,
    )
