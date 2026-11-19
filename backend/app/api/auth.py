
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
import re

import jwt

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.connection import get_db
from app.models.user import User
from app.models.otp_challenge import OTPChallenge
from app.schemas.auth import SendOTPRequest, VerifyOTPRequest


router = APIRouter(prefix="/api/auth", tags=["Authentication"])


def normalize_phone(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)

    if len(digits) == 10:
        return "+91" + digits

    if len(digits) == 12 and digits.startswith("91"):
        return "+" + digits

    raise HTTPException(
        status_code=400,
        detail="Enter a valid 10-digit Indian mobile number."
    )


def hash_otp(phone: str, purpose: str, otp: str) -> str:
    message = f"{phone}:{purpose}:{otp}".encode()

    return hmac.new(
        settings.otp_hash_secret.encode(),
        message,
        hashlib.sha256
    ).hexdigest()


@router.post("/send-otp")
def send_otp(
    request: SendOTPRequest,
    db: Session = Depends(get_db)
):
    phone = normalize_phone(request.phone)

    user = db.query(User).filter(User.phone == phone).first()

    if user:
        purpose = "login"
        full_name = None

        if not user.is_active:
            raise HTTPException(403, "Account is inactive.")

    else:
        purpose = "register"
        full_name = (request.full_name or "").strip()

        if not full_name:
            raise HTTPException(
                400,
                "Full name is required for registration."
            )

    # Real SMS provider will be connected separately.
    if settings.otp_mode != "development":
        raise HTTPException(
            503,
            "SMS provider is not configured."
        )

    now = datetime.now(timezone.utc)

    previous = (
        db.query(OTPChallenge)
        .filter(
            OTPChallenge.phone == phone,
            OTPChallenge.purpose == purpose,
            OTPChallenge.consumed_at.is_(None)
        )
        .order_by(OTPChallenge.created_at.desc())
        .first()
    )

    if previous:
        elapsed = (now - previous.created_at).total_seconds()

        if elapsed < settings.otp_resend_cooldown_seconds:
            wait = int(
                settings.otp_resend_cooldown_seconds - elapsed
            ) + 1

            raise HTTPException(
                429,
                f"Please wait {wait} seconds before requesting another OTP."
            )

    otp = f"{secrets.randbelow(1000000):06d}"

    challenge = OTPChallenge(
        phone=phone,
        full_name=full_name,
        purpose=purpose,
        otp_hash=hash_otp(phone, purpose, otp),
        attempts=0,
        expires_at=now + timedelta(
            minutes=settings.otp_expiry_minutes
        )
    )

    db.add(challenge)
    db.commit()

    # Development only: never return OTP in API response.
    print(f"[AGRINOVA DEVELOPMENT OTP] {phone}: {otp}")

    return {
        "message": "OTP generated successfully.",
        "purpose": purpose,
        "expires_in_seconds": settings.otp_expiry_minutes * 60,
        "delivery": "development_console"
    }


@router.post("/verify-otp")
def verify_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db)
):
    phone = normalize_phone(request.phone)

    user = db.query(User).filter(User.phone == phone).first()

    purpose = "login" if user else "register"

    now = datetime.now(timezone.utc)

    challenge = (
        db.query(OTPChallenge)
        .filter(
            OTPChallenge.phone == phone,
            OTPChallenge.purpose == purpose,
            OTPChallenge.consumed_at.is_(None)
        )
        .order_by(OTPChallenge.created_at.desc())
        .first()
    )

    if not challenge:
        raise HTTPException(
            400,
            "No active OTP found. Please request a new OTP."
        )

    if challenge.expires_at <= now:
        challenge.consumed_at = now
        db.commit()

        raise HTTPException(
            400,
            "OTP expired. Please request a new OTP."
        )

    if challenge.attempts >= settings.otp_max_attempts:
        challenge.consumed_at = now
        db.commit()

        raise HTTPException(
            429,
            "Maximum OTP attempts exceeded. Request a new OTP."
        )

    expected_hash = hash_otp(
        phone,
        purpose,
        request.otp
    )

    if not hmac.compare_digest(
        challenge.otp_hash,
        expected_hash
    ):
        challenge.attempts += 1

        if challenge.attempts >= settings.otp_max_attempts:
            challenge.consumed_at = now

        db.commit()

        raise HTTPException(
            400,
            "Incorrect OTP."
        )

    challenge.consumed_at = now

    if purpose == "register":
        if user:
            db.commit()
            raise HTTPException(
                409,
                "Account already exists. Please log in."
            )

        user = User(
            full_name=challenge.full_name,
            phone=phone,
            is_active=True
        )

        db.add(user)
        db.flush()

    if not user.is_active:
        db.commit()
        raise HTTPException(403, "Account is inactive.")

    access_token = jwt.encode(
        {
            "sub": str(user.id),
            "iat": now,
            "exp": now + timedelta(hours=12)
        },
        settings.jwt_secret_key,
        algorithm="HS256"
    )

    db.commit()

    return {
        "message": "Authentication successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "phone": user.phone
        },
        "next_step": (
            "farm_setup" if purpose == "register"
            else "dashboard"
        )
    }
