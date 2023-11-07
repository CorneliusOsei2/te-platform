from typing import Any

from sqlalchemy.orm import Session

import app.core.security as security
from app.ents.base import crud_base
from app.ents.user import models, schema
import app.ents.learning.models as learning_models
import app.ents.learning.schema as learning_schema


def read_workshop_lesson(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[learning_models.Workshop]:
    return db.query(learning_models.Workshop).offset(skip).limit(limit).all()


def read_dsa_lesson(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[learning_models.DataStructuresAndAlgorithms]:
    return (
        db.query(learning_models.DataStructuresAndAlgorithms)
        .offset(skip)
        .limit(limit)
        .all()
    )


def read_sys_design_lesson(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[learning_models.SystemDesign]:
    return (
        db.query(learning_models.SystemDesign).offset(skip).limit(limit).all()
    )


def read_miscellaneous_lessons(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[learning_models.Miscellaneous]:
    return (
        db.query(learning_models.Miscellaneous).offset(skip).limit(limit).all()
    )


def create_workshop_lesson(
    db: Session, *, author: str, data: learning_schema.WorkshopCreate
) -> models.User:
    data.author = author
    lesson = learning_models.Workshop(**data.dict())

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


def create_dsa_lesson(
    db: Session,
    *,
    author: str,
    data: learning_schema.DataStructuresAndAlgorithmsCreate
) -> models.User:
    data.author = author
    lesson = learning_models.DataStructuresAndAlgorithms(**data.dict())

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


def create_sys_design_lesson(
    db: Session, *, author: str, data: learning_schema.SystemDesignCreate
) -> models.User:
    data.author = author
    lesson = learning_models.SystemDesign(**data.dict())

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


def create_miscellaneous_lesson(
    db: Session, *, author: str, data: learning_schema.MiscellaneousCreate
) -> models.User:
    data.author = author
    lesson = learning_models.Miscellaneous(**data.dict())

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson
