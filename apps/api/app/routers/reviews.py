from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import Review, Sentence, User
from app.db.session import get_db
from app.schemas.reviews import ReviewCreate, ReviewRead

router = APIRouter(tags=["reviews"])


@router.post("/reviews", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_review(
    payload: ReviewCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Review:
    """Log a Recall practice attempt. Judging it (correctness/feedback) is the
    Phase 3 agent's job, not this endpoint's — it just records the attempt."""
    sentence = db.get(Sentence, payload.sentence_id)
    if sentence is None or sentence.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sentence not found")

    review = Review(
        user_id=user.id,
        sentence_id=sentence.id,
        attempt_text=payload.attempt_text,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
