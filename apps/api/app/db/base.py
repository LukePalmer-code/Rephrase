from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Shared declarative base — every ORM model inherits from this.

    Alembic points at `Base.metadata` to autogenerate migrations, so every
    model must import and subclass this same `Base`.
    """
