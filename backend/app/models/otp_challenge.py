
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.connection import Base


class OTPChallenge(Base):
    __tablename__ = "otp_challenges"

    id = Column(Integer, primary_key=True, index=True)

    phone = Column(String(20), nullable=False, index=True)
    full_name = Column(String(100), nullable=True)
    purpose = Column(String(10), nullable=False)

    otp_hash = Column(String(64), nullable=False)

    attempts = Column(Integer, nullable=False, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    expires_at = Column(DateTime(timezone=True), nullable=False)
    consumed_at = Column(DateTime(timezone=True), nullable=True)
