from typing import Any
import app.database.session as session

from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session
import app.ents.application.dependencies as application_dependencies
import app.ents.user.dependencies as user_dependencies
import app.ents.application.crud as application_crud
import app.ents.application.schema as application_schema
import app.utilities.response as custom_response

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
    Retrieve Applications.
    """
    applications = application_crud.read_user_applications(db, user_id=user_id)

    return {
        "applications": [
            application_dependencies.parse_application(application)
            for application in applications
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
    Retrieve Applications.
    """
    application = application_crud.read_user_application(
        db, user_id=user_id, application_id=application_id
    )

    return {
        "application": application_dependencies.parse_application(application)
    }


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
    Retrieve Applications.
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

"""
{
    user (1) : {
        name
    }
}
"""




@app_router.post(
    ".resumes.upload", response_model=dict[str, application_schema.FileRead]
)
def upload_resume(
    *,
    db: Session = Depends(session.get_db),
    file: UploadFile,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Create an application.
    """
    resume = application_crud.upload_resume(db, file, user.id)
    return {"resume": application_schema.FileRead(**vars(resume))}


@user_app_router.get(
    ".resumes.list", response_model=dict[str, list[application_schema.FileRead]]
)
def get_user_resumes(
    *,
    db: Session = Depends(session.get_db),
    user_id: int,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Get all resumes of `user`
    """
    resumes = application_crud.get_user_resumes(db, user_id)
    return {
        "resumes": [
            application_schema.File(**vars(resume)) for resume in resumes
        ]
    }


@user_app_router.get(
    ".essays.update",
    response_model=list[custom_response.Response],
)
def update_essay(
    *,
    db: Session = Depends(session.get_db),
    data: application_schema.Essay,
    user=Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Applications.
    """
    essay = application_crud.update_essay(db, user_id=user.id)
    return application_schema.Essay(essay=essay)


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
