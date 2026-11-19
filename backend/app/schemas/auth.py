
from pydantic import BaseModel, Field


class SendOTPRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=16)
    full_name: str | None = Field(default=None, max_length=100)


class VerifyOTPRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=16)
    otp: str = Field(pattern=r"^[0-9]{6}$")
