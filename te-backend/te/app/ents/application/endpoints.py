from typing import Any

from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session

import app.database.session as session
import app.ents.application.crud as application_crud
import app.ents.application.dependencies as application_dependencies
import app.ents.application.schema as application_schema
import app.ents.user.dependencies as user_dependencies


user_app_router = APIRouter(prefix="/users.{user_id}.applications")
app_router = APIRouter(prefix="/applications")


@app_router.post(
    ".create", response_model=dict[str, application_schema.ApplicationRead]
)
def create_application(
    *,
    db: Session = Depends(session.get_db),
    data: application_schema.ApplicationCreate,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Create an application.
    """
    application = application_crud.create_application(
        db, data=data, user_id=user.id
    )
    return {
        "application": application_dependencies.parse_application(application)
    }


@user_app_router.get(
    ".list", response_model=dict[str, list[application_schema.ApplicationRead]]
)
def get_user_applications(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve applications of user `user_id`.
    """
    applications = application_crud.read_user_applications(db, user_id=user_id)

    return {
        "applications": [
            application_dependencies.parse_application(application)
            for application in applications
            if (application.active and not application.archived)
        ]
    }


@user_app_router.get(
    ".{application_id}.info",
    response_model=dict[str, application_schema.ApplicationRead],
)
def get_user_application(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    application_id: int,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve application `application_id` of user `user_id`.
    """
    application = application_crud.read_user_application(
        db, user_id=user_id, application_id=application_id
    )

    return {
        "application": application_dependencies.parse_application(application)
    }


@user_app_router.put(
    ".{application_id}.update",
    response_model=dict[str, application_schema.ApplicationRead],
)
def update_user_application(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    application_id: int,
    data: application_schema.ApplicationUpdate,
    current_user=Depends(user_dependencies.get_current_user),
):
    """
    Update user application
    """

    application = application_crud.update_application(
        db, user_id=user_id, application_id=application_id, data=data
    )

    return {
        "application": application_dependencies.parse_application(application)
    }


@user_app_router.put(
    ".archive", response_model=dict[str, application_schema.ApplicationRead]
)
def archive_user_application(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    applications: list[int],
    current_user=Depends(user_dependencies.get_current_user),
):
    """
    Archive user applications
    """
    archived_applications = []
    for app_id in applications:
        app = application_crud.archive_application(db, application_id=app_id)
        archived_applications.append(app)

    return {
        "applications": [
            application_dependencies.parse_application(application)
            for application in archived_applications
        ]
    }


@user_app_router.delete(
    ".delete", response_model=dict[str, application_schema.ApplicationRead]
)
def delete_user_application(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    applications: int | list[int],
    current_user=Depends(user_dependencies.get_current_user),
):
    """
    Delete user applications
    """
    if isinstance(applications, int):
        applications = [applications]

    deleted_applications = []
    for app_id in applications:
        app = application_crud.delete_application(db, application_id=app_id)
        deleted_applications.append(app)

    return {
        "applications": [
            application_dependencies.parse_application(application)
            for application in deleted_applications
        ]
    }


# @user_app_router.post(
#     ".archive", response_model=dict[str, application_schema.ApplicationRead]
# )
# def delete_user_application(
#     db: Session = Depends(session.get_db),
#     *,
#     user_id: int,
#     applications: list[int],
#     current_user=Depends(user_dependencies.get_current_user),
# ):
#     """
#     Delete user applications
#     """
#     deleted_applications = []
#     for app_id in applications:
#         app = application_crud.delete_application(db, application_id=app_id)
#         deleted_applications.append(app)

#     return {
#         "applications": [
#             application_dependencies.parse_application(application)
#             for application in deleted_applications
#         ]
#     }


@user_app_router.get(
    ".files.list", response_model=dict[str, application_schema.FilesRead]
)
def get_user_application_files(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    current_user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve application files (resume and other files)
    """
    resumes, other_files = application_crud.read_user_application_files(
        db, user_id=user_id
    )
    return {
        "files": application_schema.FilesRead(
            resumes=[
                application_schema.FileRead(**vars(resume))
                for resume in resumes
            ],
            other_files=[
                application_schema.FileRead(**vars(file))
                for file in other_files
            ],
        )
    }


@user_app_router.post(
    ".resumes.upload", response_model=dict[str, application_schema.FileRead]
)
def upload_resume(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    file: UploadFile,
    _=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Upload resume for user `user_id`.
    """
    resume = application_crud.upload_resume(db, file, user_id)
    return {"resume": application_schema.FileRead(**vars(resume))}


@user_app_router.get(
    ".resumes.list", response_model=dict[str, list[application_schema.FileRead]]
)
def get_user_resumes(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Get all resumes of user `user_id`
    """
    resumes = application_crud.get_user_resumes(db, user_id)
    return {
        "resumes": [
            application_schema.File(**vars(resume)) for resume in resumes
        ]
    }


@user_app_router.get(
    ".essays.update",
    response_model=dict[str, application_schema.Essay],
)
def update_essay(
    db: Session = Depends(session.get_db),
    *,
    data: application_schema.Essay,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Update essay of user `user_id`.
    """
    essay = application_crud.update_essay(db, user_id=user.id)
    return {"essay": application_schema.Essay(essay=essay)}


# @router.put(".info/{company_id}", response_model=company_schema.CompanyRead)
# def update_company(
#     *,
#     db: Session = Depends(application_dependencies.get_current_user_db),
#     data: company_schema.CompanyUpdate,
#     user: models.Company = Depends(application_dependencies.get_current_user),
# ) -> Any:
#     """
#     Update Company.
#     """
#     company = company.crud.read_user_by_id(db, id=company.id)
#     if not company:
#         raise HTTPException(
#             status_code=404,
#             detail={
#                 "error": {
#                     "email": company.email,
#                     "message": "The company with this name does not exist in the system",
#                 }
#             },
#         )
#     company = crud.company.update(db, db_obj=company, data=data)
#     return user
