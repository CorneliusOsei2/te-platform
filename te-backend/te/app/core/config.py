from typing import Any, Optional, Union

from pydantic import (
    AnyHttpUrl,
    BaseSettings,
    EmailStr,
    HttpUrl,
    PostgresDsn,
    validator,
)


class Settings(BaseSettings):
    API_STR: str
    SECRET_KEY: str
    AUTHJWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    SERVER_HOST: str
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = [
        "http://localhost:3000",
    ]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, list[str]]) -> Union[list[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    PROJECT_NAME: str = "TechElevate"

    SENTRY_DSN: Optional[HttpUrl] = ""

    @validator("SENTRY_DSN", pre=True)
    def sentry_dsn_can_be_blank(cls, v: str) -> Optional[str]:
        if len(v) == 0:
            return None
        return v
    
    SMTP_USER: str
    SMTP_HOST: str
    SMTP_PORT: str
    SMTP_TLS: str
    SMTP_PASSWORD: str
    EMAILS_FROM_NAME: str
    EMAILS_FROM_EMAIL: str

    DATABASE_PORT: int
    POSTGRES_HOST: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn]
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_HOST"),  # type: ignore
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    FIRST_SUPERUSER_EMAIL: EmailStr
    FIRST_SUPERUSER_FIRST_NAME: str
    FIRST_SUPERUSER_LAST_NAME: str
    FIRST_SUPERUSER_PASSWORD: str
    USERS_OPEN_REGISTRATION: bool

    CLEAR_BIT_BASE_URL: str = "https://logo.clearbit.com/"

    GDRIVE_RESUMES: str
    GDRIVE_OTHER_FILES: str
    GDRIVE_LESSONS: str

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# Default image to pass if a company doesn't have any
DEFAULT_COMPANY_IMAGE = ""