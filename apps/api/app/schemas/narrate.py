from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.db.models import NarrationStatus


class NarratedSentence(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    island_id: UUID | None
    source_text: str
    target_text: str


class NarrateResponse(BaseModel):
    session_id: UUID
    status: NarrationStatus
    sentences: list[NarratedSentence]
