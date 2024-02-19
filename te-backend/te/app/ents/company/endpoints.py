from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import app.database.session as session

import app.ents.user.dependencies as user_dependencies
import app.ents.user.models as user_models

import app.ents.company.dependencies as company_dependencies
import app.ents.company.crud as company_crud
import app.ents.company.schema as company_schema

company_router = APIRouter(prefix="/companies")
referral_router = APIRouter(prefix="/referrals")
user_referral_router = APIRouter(prefix="/users.{user_id}.referrals")


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


@company_router.post(
    ".create", response_model=dict[str, company_schema.CompanyRead]
)
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
            #! Update company data
            ...

    company = company_crud.create_company(db, data=data)
    return {"company": company_dependencies.parse_company(company)}


@company_router.get(
    ".list", response_model=dict[str, list[company_schema.CompanyRead]]
)
def get_companies(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    # _: str = Depends(dependencies.get_current_user),
) -> Any:
    """
    Retrieve all companies.
    """
    companies = company_crud.read_company_multi(db, skip=skip, limit=limit)
    return {
        "companies": [
            company_dependencies.parse_company(company) for company in companies
        ]
    }


@company_router.post(
    ".update", response_model=dict[str, company_schema.CompanyRead]
)
def update_company(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    # _: str = Depends(dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    companies = company_crud.read_company_multi(db, skip=skip, limit=limit)
    return {
        "companies": [
            company_dependencies.parse_company(company) for company in companies
        ]
    }


@company_router.get(
    ".referrals.list",
    response_model=dict[str, list[company_schema.CompanyReadForReferrals]],
)
def get_referral_companies(
    db: Session = Depends(session.get_db),
    skip: int = 0,
    limit: int = 100,
    user: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    companies = company_crud.read_referral_companies(db, skip=skip, limit=limit)
    return {
        "companies": [
            company_dependencies.parse_company_for_referrals(user.id, company)
            for company in companies
        ]
    }


@user_referral_router.post(
    ".create",
    response_model=dict[str, company_schema.ReferralRead],
)
def request_referral(
    db: Session = Depends(session.get_db),
    *,
    data: company_schema.ReferralRequest,
    user: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Request a referral for `user`
    """
    referral = company_crud.request_referral(
        db,
        user_id=user.id,
        data=data,
    )
    return {"referral": company_dependencies.parse_referral(referral)}


@user_referral_router.get(
    ".list",
    response_model=dict[str, list[company_schema.ReferralRead]],
)
def get_user_referrals(
    db: Session = Depends(session.get_db),
    *,
    user_id: int,
    user: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Get all referrals of `user`.
    """
    referrals = company_crud.read_user_referrals(db, user_id=user_id)
    return {
        "referrals": [
            company_dependencies.parse_referral(referral)
            for referral in referrals
        ]
    }


@referral_router.post(
    ".{referral_id}.review",
    response_model=dict[str, list[company_schema.CompanyRead]],
)
def review_referral(
    *,
    db: Session = Depends(session.get_db),
    referral_id: int,
    data: str,
    user: user_models.User = Depends(user_dependencies.get_current_user),
) -> Any:
    """
    Retrieve Companies.
    """
    ...


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
