from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SentenceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    island_id: UUID | None
    source_text: str
    target_text: str
    created_at: datetime
