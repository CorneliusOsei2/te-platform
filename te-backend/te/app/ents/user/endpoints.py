from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

import app.database.session as session
import app.ents.user.auth as user_auth
import app.ents.user.crud as user_crud
import app.ents.user.dependencies as user_dependencies
import app.ents.user.models as user_models
import app.ents.user.schema as user_schema

router = APIRouter(prefix="/users")


@router.post("/login")
def login_user(
    response: Response, token=Depends(user_auth.login_access_token)
) -> Any:
    """
    Log User in.
    """
    response.headers[
        "Authorization"
    ] = f'{token.get("type")} {token.get("access_token")}'
    # response.set_cookie(
    #     key="access_token", value=token.get("access_token"), samesite=None
    # )
    return token


@router.get(".mentees.list", response_model=list[user_schema.UserRead])
def get_mentees(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active mentees.
    """
    users = user_crud.read_mentees(db, skip=skip, limit=limit)
    return users


@router.get(".mentors.list", response_model=list[user_schema.UserRead])
def get_mentors(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active mentors.
    """
    users = user_crud.read_mentors(db, skip=skip, limit=limit)
    return users


@router.get(".list", response_model=list[user_schema.UserRead])
def get_users(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active users.
    """
    users = user_crud.read_users(db, skip=skip, limit=limit)
    return users


@router.post(".create", response_model=user_schema.UserRead)
def create_user(
    *,
    db: Session = Depends(session.get_db),
    data: user_schema.UserCreate,
) -> Any:
    """
    Create an User.
    """
    if user_crud.read_by_email(db, email=data.email):
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "email": data.email,
                    "message": "The user with this email already exists!",
                }
            },
        )

    return user_crud.create_user(db, data=data)


# @router.put(".info/{user_id}", response_model=user_schema.UserRead)
# def update_user(
#     *,
#     db: Session = Depends(session.get_db),
#     data: user_schema.UserUpdate,
#     current_user: user_models.User = Depends(
#         base_dependencies.get_current_user
#     ),
# ) -> Any:
#     """
#     Update User.
#     """
#     if not user_crud.read_by_id(db, id=user.id):
#         raise HTTPException(
#             status_code=404,
#             detail={
#                 "error": {
#                     "email": user.email,
#                     "message": "The user with this user name does not exist in the system",
#                 }
#             },
#         )
#     user = user_crud.update(db, db_obj=user, data=data)
#     return user
