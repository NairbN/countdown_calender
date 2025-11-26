from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Load values from environment (and .env), ignore extra keys so unknown vars don't break startup.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Core runtime config the app needs.
    database_url: str
    secret_key: str
    access_token_expire_minutes: int = 60
    env: str = "dev"
    cors_origins: list[str] | str = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, v):
        # Allow comma-separated string in env (e.g., "http://a,http://b")
        if isinstance(v, str):
            return [o.strip() for o in v.split(",") if o.strip()]
        if isinstance(v, (list, tuple)):
            return list(v)
        raise ValueError("Invalid cors_origins value")


# Instantiate once and import elsewhere so everything shares the same settings.
settings = Settings()
