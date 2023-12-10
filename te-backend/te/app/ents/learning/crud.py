from sqlalchemy.orm import Session

import app.ents.learning.models as learning_models
import app.ents.learning.schema as learning_schema


def read_lessons(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[learning_models.Lesson]:
    return db.query(learning_models.Lesson).offset(skip).limit(limit).all()


def create_lesson(
    db: Session, *, data: learning_schema.LessonCreate
) -> learning_models.Lesson:
    lesson = learning_models.Lesson(**data.dict())

    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson
