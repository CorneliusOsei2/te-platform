from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

import app.ents.user.crud as user_crud
import app.ents.company.schema as company_schema
import app.ents.company as company


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


# @router.post(".create", response_model=company_schema.CompanyRead)
# def create_company(
#     *,
#     db: Session = Depends(dependencies.get_db),
#     data: company_schema.CompanyCreate,
#     # _=Depends(get_current_user),
# ) -> Any:
#     """
#     Create an Company.
#     """
#     company = user_crud.read_by_email(db, email=data.email)
#     if company:
#         raise HTTPException(
#             status_code=400,
#             detail={
#                 "error": {
#                     "email": company.name,
#                     "message": "The company with this name already exists!",
#                 }
#             },
#         )

#     company = crud.company.create(db, data=data)
#     return company


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
