from typing import Any, Optional, Union

from pydantic import (
    AnyHttpUrl,
    EmailStr,
    HttpUrl,
    PostgresDsn,
    field_validator,
    ValidationError,
    ValidationInfo,
)
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_STR: str
    PROJECT_NAME: str
    SERVER_HOST: str
    DOMAIN: str

    SECRET_KEY: str
    AUTHJWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = [
        "http://localhost:3000",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, list[str]]) -> Union[list[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v

    # SENTRY_DSN: Optional[HttpUrl] = ""

    # @field_validator("SENTRY_DSN")
    # def sentry_dsn_can_be_blank(cls, v: str) -> Optional[str]:
    #     if len(v) == 0:
    #         return None
    #     return v

    # SMTP_USER: str
    # SMTP_HOST: str
    # SMTP_PORT: str
    # SMTP_TLS: str
    # SMTP_PASSWORD: str
    EMAILS_FROM_NAME: str
    EMAILS_FROM_EMAIL: str

    POSTGRES_PORT: int
    POSTGRES_HOST: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: Optional[str], values: ValidationInfo) -> Any:
        if isinstance(v, str):
            return v

        return PostgresDsn.build(
            scheme="postgresql",
            username=values.data.get("POSTGRES_USER"),
            password=values.data.get("POSTGRES_PASSWORD"),
            host=values.data.get("POSTGRES_HOST"),
            path=values.data.get("POSTGRES_DB") or "",
        )

    # @field_validator("SQLALCHEMY_DATABASE_URI")
    # def assemble_db_connection(cls, v: Optional[str], values: dict[str, Any]) -> Any:
    #     if isinstance(v, str):
    #         return v
    #     return PostgresDsn.build(
    #         scheme="postgresql",
    #         user=values.get("POSTGRES_USER"),
    #         password=values.get("POSTGRES_PASSWORD"),
    #         host=values.get("POSTGRES_HOST"),  # type: ignore
    #         path=f"/{values.get('POSTGRES_DB') or ''}",
    #     )

    # Superuser
    FIRST_SUPERUSER_EMAIL: EmailStr
    FIRST_SUPERUSER_FIRST_NAME: str
    FIRST_SUPERUSER_LAST_NAME: str
    FIRST_SUPERUSER_PASSWORD: str
    USERS_OPEN_REGISTRATION: bool

    # Google Drive
    GDRIVE_RESUMES: str
    GDRIVE_OTHER_FILES: str
    GDRIVE_LESSONS: str

    class Config:
        env_file = ".env"
        case_sensitive = True


try:
    settings = Settings()
except ValidationError as err:
    print(err.json(indent=4))
