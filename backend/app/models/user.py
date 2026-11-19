
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.database.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(
        String(100),
        nullable=False
    )

    phone = Column(
        String(20),
        unique=True,
        nullable=False,
        index=True
    )

    is_active = Column(
        Boolean,
        default=True,
        server_default="true",
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
