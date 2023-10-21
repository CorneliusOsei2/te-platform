from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import Token, security
import app.ents.user.dependencies as user_dependencies
import app.ents.user.schema as user_schema
import app.ents.user.models as user_models


router = APIRouter(prefix="/users")


@router.post("/login/access-token", response_model=Token)
def login_access_token(
    db: Session = Depends(user_dependencies.get_db),
    data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = user.crud.authenticate(
        db, email=data.username, password=data.password
    )
    if not user:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password"
        )
    elif not user.crud.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "type": "bearer",
    }


@router.post("/login/test-token", response_model=user_schema.UserRead)
def test_token(
    current_user: user_models.User = Depends(
        user_dependencies.get_current_user
    ),
) -> Any:
    """
    Test access token
    """
    return current_user


# @router.post("/password-recovery/{email}", response_model=schema.Msg)
# def recover_password(email: str, db: Session = Depends(user_dependencies.get_db)) -> Any:
#     """
#     Password Recovery
#     """
#     user = user.crud.read_by_email(db, email=email)

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this username does not exist in the system.",
#         )
#     password_reset_token = utils.generate_password_reset_token(email=email)
#     utils.send_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token  # type: ignore  Column--warning
#     )
#     return {"schemas.Msg": "Password recovery email sent"}


# @router.post("/reset-password/", response_model=schemas.Msg)
# def reset_password(
#     token: str = Body(...),
#     new_password: str = Body(...),
#     db: Session = Depends(dependencies.get_db),
# ) -> Any:
#     """
#     Reset password
#     """
#     email = utils.verify_password_reset_token(token)
#     if not email:
#         raise HTTPException(status_code=400, detail="Invalid token")
#     user = user.crud.read_by_email(db, email=email)
#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this username does not exist in the system.",
#         )
#     elif not user.crud.is_active(user):
#         raise HTTPException(status_code=400, detail="Inactive user")
#     hashed_password = get_password_hash(new_password)
#     user.hashed_password = hashed_password  # type: ignore  Column--warning
#     db.add(user)
#     db.commit()
#     return {"schemas.Msg": "Password updated successfully"}
