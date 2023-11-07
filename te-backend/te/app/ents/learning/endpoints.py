from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

import app.ents.user.dependencies as user_dependencies
import app.ents.user.models as user_models
import app.ents.learning.schema as learning_schema
import app.ents.learning.crud as learning_crud
import app.database.session as session

router = APIRouter(prefix="/learning")


@router.get(
    ".workshops.list",
    response_model=dict[str, list[learning_schema.WorkshopRead]],
)
def get_workshop_lesson(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Problems.
    """
    lessons = learning_crud.read_workshop_lesson(db, skip=skip, limit=limit)
    return {
        "lessons": [
            learning_schema.WorkshopRead(**vars(lesson)) for lesson in lessons
        ]
    }


@router.get(
    ".dsa.list",
    response_model=dict[
        str, list[learning_schema.DataStructuresAndAlgorithmsRead]
    ],
)
def get_dsa_lessons(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Problems.
    """
    lessons = learning_crud.read_dsa_lesson(db, skip=skip, limit=limit)
    return {
        "lessons": [
            learning_schema.DataStructuresAndAlgorithmsRead(**vars(lesson))
            for lesson in lessons
        ]
    }


@router.get(
    ".sysdesign.list",
    response_model=dict[str, list[learning_schema.SystemDesignRead]],
)
def get_sys_design_lessons(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Problems.
    """
    lessons = learning_crud.read_dsa_lesson(db, skip=skip, limit=limit)
    return {
        "lessons": [
            learning_schema.SystemDesignRead(**vars(lesson))
            for lesson in lessons
        ]
    }


@router.get(
    ".miscellaneous.list",
    response_model=dict[str, list[learning_schema.MiscellaneousRead]],
)
def get_miscellaneous_lessons(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    _: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Problems.
    """
    lessons = learning_crud.read_miscellaneous_lessons(
        db, skip=skip, limit=limit
    )
    return {
        "lessons": [
            learning_schema.MiscellaneousRead(**vars(lesson))
            for lesson in lessons
        ]
    }


@router.post(
    ".workshops.create", response_model=dict[str, learning_schema.WorkshopRead]
)
def create_workshop_lesson(
    *,
    db: Session = Depends(session.get_db),
    data: learning_schema.WorkshopCreate,
    current_user: user_models.User = Depends(
        user_dependencies.get_current_user
    ),
) -> Any:
    """
    Create a workshop lesson.
    """
    lesson = learning_crud.create_workshop_lesson(
        db, author=current_user.full_name, data=data
    )
    return {"lesson": learning_schema.WorkshopRead(**vars(lesson))}


@router.post(
    ".dsa.create",
    response_model=dict[str, learning_schema.DataStructuresAndAlgorithmsRead],
)
def create_dsa_lesson(
    *,
    db: Session = Depends(session.get_db),
    data: learning_schema.DataStructuresAndAlgorithmsCreate,
    current_user: user_models.User = Depends(
        user_dependencies.get_current_user
    ),
) -> Any:
    """
    Create a dsa lesson.
    """
    lesson = learning_crud.create_dsa_lesson(
        db, author=current_user.full_name, data=data
    )
    return {
        "lesson": learning_schema.DataStructuresAndAlgorithmsRead(
            **vars(lesson)
        )
    }


@router.post(
    ".sysdesigns.create",
    response_model=dict[str, learning_schema.SystemDesignRead],
)
def create_sysdesign_lesson(
    *,
    db: Session = Depends(session.get_db),
    data: learning_schema.SystemDesignCreate,
    current_user: user_models.User = Depends(
        user_dependencies.get_current_user
    ),
) -> Any:
    """
    Create a sysdesign lesson.
    """
    lesson = learning_crud.create_sys_design_lesson(
        db, author=current_user.full_name, data=data
    )
    return {"lesson": learning_schema.SystemDesignRead(**vars(lesson))}


@router.post(
    ".miscellaneous.create",
    response_model=dict[str, learning_schema.MiscellaneousRead],
)
def create_miscellaneous_lesson(
    *,
    db: Session = Depends(session.get_db),
    data: learning_schema.MiscellaneousCreate,
    current_user: user_models.User = Depends(
        user_dependencies.get_current_user
    ),
) -> Any:
    """
    Create a miscellaneous lesson.
    """
    lesson = learning_crud.create_miscellaneous_lesson(
        db, author=current_user.full_name, data=data
    )
    return {"lesson": learning_schema.MiscellaneousRead(**vars(lesson))}


# @router.put(".info/{problem_id}", response_model=problem_schema.ProproblemRead)
# def update_problem(
#     *,
#     db: Session = Depends(dependencies.get_db),
#     data: problem_schema.ProproblemUpdate,
#     user: models.Proproblem = Depends(dependencies.get_current_user),
# ) -> Any:
#     """
#     Update Proproblem.
#     """
#     problem = problem.crud.read_user_by_id(db, id=problem.id)
#     if not problem:
#         raise HTTPException(
#             status_code=404,
#             detail={
#                 "error": {
#                     "email": problem.email,
#                     "message": "The problem with this name does not exist in the system",
#                 }
#             },
#         )
#     problem = problem_crud.update(db, db_obj=problem, data=data)
#     return user
