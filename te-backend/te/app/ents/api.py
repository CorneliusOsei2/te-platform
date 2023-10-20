from fastapi import APIRouter

from app.ents import member, user

api_router = APIRouter()

api_router.include_router(user.login_router, tags=["User Login"])
api_router.include_router(user.endpoints_router, tags=["User Endpoints"])

api_router.include_router(member.auth_router, tags=["Member Auth"])
api_router.include_router(member.endpoints_router, tags=["Member Endpoints"])
