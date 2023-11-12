from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

import app.database.session as session
import app.ents.user.auth as user_auth
import app.ents.user.crud as user_crud
import app.ents.user.dependencies as user_dependencies
import app.ents.user.models as user_models
import app.ents.user.schema as user_schema

router = APIRouter(prefix="/users")


@router.post(".login")
def login_user(
    response: Response, token=Depends(user_auth.login_access_token)
) -> Any:
    """
    Log User in.
    """
    return {"token": token}


@router.get(
    ".mentees.list", response_model=dict[str, list[user_schema.UserRead]]
)
def get_mentees(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active mentees.
    """
    mentees = user_crud.read_mentees(db, skip=skip, limit=limit)
    return {
        "mentees": [user_schema.UserRead(**vars(mentor)) for mentor in mentees]
    }


@router.get(
    ".mentors.list", response_model=dict[str, list[user_schema.UserRead]]
)
def get_mentors(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active mentors.
    """
    mentors = user_crud.read_mentors(db, skip=skip, limit=limit)
    return {
        "mentors": [user_schema.UserRead(**vars(mentor)) for mentor in mentors]
    }


@router.get(".list", response_model=dict[str, list[user_schema.UserRead]])
def get_users(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve all active users.
    """
    users = user_crud.read_users(db, skip=skip, limit=limit)
    return {"users": [user_schema.UserRead(**vars(user)) for user in users]}


@router.post(".create", response_model=dict[str, user_schema.UserRead])
def create_user(
    *,
    db: Session = Depends(session.get_db),
    data: user_schema.UserCreate,
) -> Any:
    """
    Create an User.
    """
    new_user = user_crud.create_user(db, data=data)
    return {"user": user_schema.UserRead(**vars(new_user))}


@router.get(".{user_id}.essay", response_model=dict[str, str])
def get_essay(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    _: user_models.User = Depends(user_dependencies.get_current_user),
):
    essay = user_crud.read_user_essay(db, user_id=user_id)
    return {"essay": essay}


@router.post(".{user_id}.essay", response_model=dict[str, str])
def update_essay(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    data: dict[str, str],
    _: user_models.User = Depends(user_dependencies.get_current_user),
):
    essay = user_crud.add_user_essay(db, user_id=user_id, data=data)
    return {"essay": essay}
