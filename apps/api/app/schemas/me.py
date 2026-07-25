from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    display_name: str | None
    target_language: str
    created_at: datetime


class UserUpdate(BaseModel):
    """Only fields listed here are ever touched; unset fields are left alone."""

    display_name: str | None = None
    target_language: str | None = None
