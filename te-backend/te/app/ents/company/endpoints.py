from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
import app.database.session as session

import app.ents.user.dependencies as user_dependencies
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
    db: Session = Depends(session.get_db),
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
    db: Session = Depends(session.get_db),
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


@router.get(
    ".referrals.list",
    response_model=dict[str, list[company_schema.CompanyRead]],
)
def get_referral_companies(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    user: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    companies = company_crud.read_referral_companies(db, skip=skip, limit=limit)
    return {
        "companies": [
            company_dependencies.parse_company_for_referrals(company)
            for company in companies
        ]
    }


@router.post(
    ".referrals.create",
    response_model=dict[str, list[company_schema.CompanyRead]],
)
def request_referral(
    *,
    db: Session = Depends(session.get_db),
    data: str,
    user: str = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    companies = company_crud.request_referral(db, data=data, user_id=user.id)
    return {
        "companies": [
            company_dependencies.parse_company_for_referrals(company)
            for company in companies
        ]
    }


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
