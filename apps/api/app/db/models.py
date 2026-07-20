"""SQLAlchemy ORM models for the core tables.

Deliberately NOT modeled here (per the locked-in plan): Playlists, PracticeSets,
ProfileStats. Those are computed on the fly from these tables via queries in
Phase 2, rather than stored as their own tables — avoids duplicated/stale data.
"""

import enum
import uuid
from datetime import datetime

from pgvector.sqlalchemy import Vector
from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.base import Base

# text-embedding-3-small (our chosen OpenAI embedding model) outputs 1536 dims.
EMBEDDING_DIMENSIONS = 1536


class User(Base):
    """One row per app user.

    `id` IS the Cognito `sub` claim (already a globally-unique UUID-format
    string issued by Cognito) — we deliberately don't add a separate surrogate
    key, since Cognito is our only auth provider and this keeps the model simple.
    """

    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class Island(Base):
    """A topic grouping for sentences, e.g. 'Work', 'Travel'."""

    __tablename__ = "islands"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str | None] = mapped_column(Text, default=None)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    sentences: Mapped[list["Sentence"]] = relationship(back_populates="island")


class Sentence(Base):
    """One narrated-and-translated sentence, plus its embedding for pgvector search."""

    __tablename__ = "sentences"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    island_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("islands.id"), index=True, default=None
    )
    source_text: Mapped[str] = mapped_column(Text)
    target_text: Mapped[str] = mapped_column(Text)
    embedding: Mapped[list[float]] = mapped_column(Vector(EMBEDDING_DIMENSIONS))
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    island: Mapped[Island | None] = relationship(back_populates="sentences")
    reviews: Mapped[list["Review"]] = relationship(back_populates="sentence")


class ReviewCorrectness(str, enum.Enum):
    """Output of the Phase 3 Recall feedback agent's judgment on a review attempt."""

    EXACT = "exact"
    CLOSE = "close"
    WRONG_TENSE = "wrong_tense"
    WRONG = "wrong"


class Review(Base):
    """One Recall practice attempt at a sentence, and the agent's feedback on it."""

    __tablename__ = "reviews"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    sentence_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sentences.id"), index=True
    )
    attempt_text: Mapped[str] = mapped_column(Text)
    correctness: Mapped[ReviewCorrectness | None] = mapped_column(default=None)
    feedback: Mapped[str | None] = mapped_column(Text, default=None)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    sentence: Mapped[Sentence] = relationship(back_populates="reviews")


class NarrationStatus(str, enum.Enum):
    """Where a Narrate submission is in the Phase 3 fixed pipeline."""

    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class NarrationSession(Base):
    """One Narrate submission — the raw transcript and pipeline status.

    Per the locked-in plan, raw audio is discarded after transcription (not
    stored in S3), so this table only ever holds text.
    """

    __tablename__ = "narration_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    raw_transcript: Mapped[str] = mapped_column(Text)
    status: Mapped[NarrationStatus] = mapped_column(default=NarrationStatus.PROCESSING)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
