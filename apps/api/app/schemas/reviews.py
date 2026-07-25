from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.db.models import ReviewCorrectness


class ReviewCreate(BaseModel):
    sentence_id: UUID
    attempt_text: str


class ReviewRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    sentence_id: UUID
    attempt_text: str
    # Both left null by POST /reviews itself — judging an attempt is the
    # Phase 3 Recall feedback agent's job, not this endpoint's.
    correctness: ReviewCorrectness | None
    feedback: str | None
    created_at: datetime
