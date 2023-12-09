from datetime import datetime, timedelta
from typing import Any

from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.config import settings
import app.ents.user.crud as user_crud
import app.ents.user.models as user_models


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: str = ""


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(
    subject: str | Any, expires_delta: timedelta | None = None
) -> str:
    """
    Creates an access token with `subject` that expires after `expires_delta`.
    """

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        claims=to_encode, key=settings.SECRET_KEY, algorithm="HS256"
    )
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Checks if `plain_password` is `hashed_password`.

    Args:
        plain_password (str): User input password.
        hashed_password (str): Hashed password with passlib

    Returns:
        bool: If the two passwords are same.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def authenticate(db: Session, *, email: str, password: str) -> user_models.User:
    user = user_crud.read_user_by_email(db, email=email)
    if not user:
        return None

    if not verify_password(password, user.password):
        return None
    return user


def is_superuser(user) -> bool:
    ...
