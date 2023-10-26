from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import app.ents.base.dependencies as base_dependencies
import app.ents.company.dependencies as company_dependencies
import app.ents.company.crud as company_crud
import app.ents.company.schema as company_schema

router = APIRouter(prefix="/companies")


# @router.get(".list", response_model=list[company_schema.CompanyRead])
# def get_companies(
#     db: Session = Depends(dependencies.get_db),
#     skip: int = 0,
#     limit: int = 100,
#     # _: str = Depends(dependencies.get_current_user),
# ) -> Any:
#     """
#     Retrieve Companies.
#     """
#     companies = crud.company.read_multi(db, skip=skip, limit=limit)
#     return companies


@router.post(".create", response_model=company_schema.CompanyRead)
def create_company(
    *,
    db: Session = Depends(base_dependencies.get_db),
    data: company_schema.CompanyCreate,
    # _=Depends(get_current_user),
) -> Any:
    """
    Create an Company.
    """
    if company := company_crud.read_company_by_name(db, name=data.name):
        if not (
            any(
                data.location.city == location.city
                and data.location.country == location.country
                for location in company.locations
            )
        ):
            company = company_crud.add_location(
                db, company=company, data=data.location
            )
            return company_dependencies.parse_company(company)
        else:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": {
                        "email": company.name,
                        "message": "The company with this name already exists!",
                    }
                },
            )
    company = company_crud.create_company(db, data=data)
    return company_dependencies.parse_company(company)


@router.get(".list", response_model=list[company_schema.CompanyRead])
def get_companies(
    db: Session = Depends(base_dependencies.get_db),
    skip: int = 0,
    limit: int = 100,
    # _: str = Depends(dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    companies = company_crud.read_company_multi(db, skip=skip, limit=limit)
    return [
        company_dependencies.parse_company(company) for company in companies
    ]


# @router.put(".info/{company_id}", response_model=company_schema.CompanyRead)
# def update_company(
#     *,
#     db: Session = Depends(dependencies.get_db),
#     data: company_schema.CompanyUpdate,
#     user: models.Company = Depends(dependencies.get_current_user),
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
