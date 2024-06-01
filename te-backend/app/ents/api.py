from app.ents.learning.endpoints import router as learning_router
from app.ents.problem.endpoints import router as problem_router
from fastapi import APIRouter

api_router = APIRouter()

api_router.include_router(learning_router, tags=["Learning Endpoints"])
api_router.include_router(problem_router, tags=["Problem Endpoints"])
