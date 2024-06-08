from typing import Any

import app.ents.learning.crud as learning_crud
import app.ents.learning.schema as learning_schema
from app.core.settings import settings
from fastapi import APIRouter, Depends, UploadFile

router = APIRouter(prefix="/learning")


@router.get(
    ".lessons.list",
)
def get_lessons_v1(
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve current lessons
    """
    lessons = learning_crud.read_lessons_v1(skip=skip, limit=limit)
    return lessons


@router.post(
    ".lessons.create",
    response_model=dict[str, learning_schema.LessonRead],
)
def add_lesson_v1(data: learning_schema.LessonCreate) -> Any:
    """
    Create a  lesson.
    """
    lesson = learning_crud.create_lesson_v1(data=data)

    return {"lesson": learning_schema.LessonRead(**vars(lesson))}


def delete_lesson(): ...
