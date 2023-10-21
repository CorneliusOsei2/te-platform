from sqlalchemy.orm import Session

import app.ents.user.crud as user_crud
import app.ents.user.schema as user_schema

from app.core.config import settings
from app.database.base import Base
from app.database.session import engine

# make sure all SQL Alchemy models are imported (app.database.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # * If creating without Alembic
    Base.metadata.create_all(bind=engine)

    superuser = user_crud.read_by_email(
        db=db, email=settings.FIRST_SUPERUSER_EMAIL
    )
    if not superuser:
        user_in = user_schema.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            first_name=settings.FIRST_SUPERUSER_FIRST_NAME,
            last_name=settings.FIRST_SUPERUSER_LAST_NAME,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            role=user_schema.UserRoles.admin.value,
        )
        superuser = user_crud.create(db, data=user_in)
