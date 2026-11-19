
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    app_name: str = "AgriNova"
    debug: bool = True
    database_url: str

    jwt_secret_key: str
    otp_hash_secret: str

    otp_mode: str = "development"
    otp_expiry_minutes: int = 5
    otp_resend_cooldown_seconds: int = 60
    otp_max_attempts: int = 5


settings = Settings()
