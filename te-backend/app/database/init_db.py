import app.ents.user.crud as user_crud
import app.ents.user.schema as user_schema
from app.core.settings import settings
from sqlalchemy.orm import Session


from app.database import base  # noqa


def init_db(db: Session) -> None:
    # * If creating without Alembic
    # Base.metadata.create_all(bind=engine)

    superuser = user_crud.read_user_by_email(
        db=db, email=settings.FIRST_SUPERUSER_EMAIL
    )
    if not superuser:
        user_in = user_schema.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            first_name=settings.FIRST_SUPERUSER_FIRST_NAME,
            last_name=settings.FIRST_SUPERUSER_LAST_NAME,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            role=user_schema.UserRoles.admin,
        )
        superuser = user_crud.create_user(db, data=user_in)
