from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class IslandRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    description: str | None
    # Computed (count of sentences with this island_id), not a DB column.
    sentence_count: int
    created_at: datetime
