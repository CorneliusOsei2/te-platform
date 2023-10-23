from fastapi import APIRouter

from app.ents import company, problem, user

api_router = APIRouter()

api_router.include_router(user.auth_router, tags=["User Login"])
api_router.include_router(user.endpoints_router, tags=["User Endpoints"])

api_router.include_router(company.company_router, tags=["Company Endpoints"])
api_router.include_router(
    company.application_router, tags=["Application Endpoints"]
)

api_router.include_router(problem.endpoints_router, tags=["Problem Endpoints"])
