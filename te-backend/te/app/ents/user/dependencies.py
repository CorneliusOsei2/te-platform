from fastapi import Cookie, Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

import app.ents.user.crud as user_crud
import app.ents.user.models as user_models
import app.ents.user.schema as user_schema
from app.core import config
import app.core.security as security
import app.database.session as session

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{config.settings.API_STR}/login/access-token"
)


def get_current_user(
    db: Session = Depends(session.get_db),
    token=Depends(reusable_oauth2),
) -> user_models.User:
    try:
        payload = jwt.decode(
            token=token,
            key=config.settings.SECRET_KEY,
            algorithms=["HS256"],
        )
        token_data = security.TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = user_crud.read_by_id(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_active_user(
    current_user: user_models.User = Depends(get_current_user),
) -> user_models.User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_mentor(
    current_user: user_models.User = Depends(get_current_user),
) -> user_models.User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    if current_user.role != user_schema.UserRoles.mentor:
        raise HTTPException(status_code=400, detail="Unauthorized access")

    return current_user


def get_current_active_admin(
    current_user: user_models.User = Depends(get_current_user),
) -> user_models.User:
    if not current_user.role == user_schema.UserRoles.admin:
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
