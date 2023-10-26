from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.ents.base.dependencies as base_dependencies
import app.ents.company.dependencies as company_dependencies
import app.ents.application.dependencies as application_dependencies
import app.ents.company.crud as company_crud
import app.ents.application.crud as application_crud
import app.ents.application.schema as company_schema
import app.ents.application.schema as application_schema


router = APIRouter(prefix="/applications")


@router.post(".create", response_model=application_schema.ApplicationRead)
def create_application(
    *,
    db: Session = Depends(base_dependencies.get_db),
    data: application_schema.ApplicationCreate,
    # _=Depends(get_current_user),
) -> Any:
    """
    Create an application.
    """
    application = application_crud.create_application(db, data=data)
    return application_dependencies.parse_application(application)


@router.get(".list", response_model=list[application_schema.ApplicationRead])
def get_applications(
    db: Session = Depends(base_dependencies.get_db),
    skip: int = 0,
    limit: int = 100,
    # _: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Applications.
    """
    applications = application_crud.read_application_multi(
        db, skip=skip, limit=limit
    )

    return [
        application_dependencies.parse_application(application)
        for application in applications
    ]


@router.get(
    ".materials.list", response_model=list[application_schema.ApplicationRead]
)
def update_essay(
    *,
    db: Session = Depends(base_dependencies.get_db),
    data: application_schema.Essay,
    # user: str = Depends(user_dependencies.get_current_user),
    user_id: int = 1,
) -> Any:
    """
    Retrieve Applications.
    """
    return application_crud.update_essay(db, user_id)


# @router.put(".info/{company_id}", response_model=company_schema.CompanyRead)
# def update_company(
#     *,
#     db: Session = Depends(user_dependencies.get_db),
#     data: company_schema.CompanyUpdate,
#     user: models.Company = Depends(user_dependencies.get_current_user),
# ) -> Any:
#     """
#     Update Company.
#     """
#     company = company.crud.read_by_id(db, id=company.id)
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
