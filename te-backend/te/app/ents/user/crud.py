from typing import Any

from sqlalchemy.orm import Session

import app.ents.user.models as user_models
import app.ents.user.schema as user_schema
import app.core.security as security


def read_by_email(db: Session, *, email: str) -> user_models.User | None:
    return (
        db.query(user_models.User)
        .filter(user_models.User.email == email)
        .first()
    )


def read_by_id(db: Session, *, id: int) -> user_models.User | None:
    return db.query(user_models.User).filter(user_models.User.id == id).first()


def is_active(db: Session, *, user: user_models.User) -> bool:
    return user.is_active


def read_mentees(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[user_models.User]:
    return (
        db.query(user_models.User)
        .filter(user_models.User.role == user_schema.UserRoles.mentee)
        .offset(skip)
        .limit(limit)
        .all()
    )


def read_mentors(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[user_models.User]:
    return (
        db.query(user_models.User)
        .filter(user_models.User.role == user_schema.UserRoles.mentor)
        .offset(skip)
        .limit(limit)
        .all()
    )


def read_users(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[user_models.User]:
    return db.query(user_models.User).offset(skip).limit(limit).all()


def get_full_name(data: user_schema.UserCreate) -> str:
    return f"{data.first_name} {data.middle_name} {data.last_name}"


def create_user(
    db: Session, *, data: user_schema.UserCreate
) -> user_models.User:
    data.password = security.get_password_hash(data.password)
    user = user_models.User(
        **(data.dict()),
    )

    user.full_name = get_full_name(data)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# def update(
#     db: Session,
#     *,
#     db_obj: user_models.User,
#     data: user_schema.UserUpdate | dict[str, Any],
# ) -> user_models.User:
#     if isinstance(data, dict):
#         update_data = data
#     else:
#         update_data = data.dict(exclude_unset=True)
#     if update_data["password"]:
#         hashed_password = security.get_password_hash(update_data["password"])
#         del update_data["password"]
#         update_data["hashed_password"] = hashed_password
#     return super().update(db, db_obj=db_obj, data=update_data)
