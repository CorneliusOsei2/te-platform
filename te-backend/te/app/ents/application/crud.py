from datetime import date

from sqlalchemy.orm import Session

import app.ents.application.models as application_models
import app.ents.application.schema as application_schema
import app.ents.company.crud as company_crud
import app.ents.company.models as company_models
import app.ents.company.schema as company_schema
import app.ents.user.crud as user_crud
import app.utilities.response as custom_response


def read_application_multi(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[application_models.Application]:
    return (
        db.query(application_models.Application).offset(skip).limit(limit).all()
    )


def create_application(
    db: Session, *, user_id: int, data: application_schema.ApplicationCreate
):
    location = None
    company = company_crud.read_company_by_name(db, name=data.company)
    if not company:
        company = company_crud.create_company(
            db,
            data=company_schema.CompanyCreate(
                **{
                    "name": data.company,
                    "location": {
                        "country": data.location.country,
                        "city": data.location.city,
                    },
                    "domain": "",
                }
            ),
        )
        location = company.locations[0]

    if not location:
        for loc in company.locations:
            if (
                loc.country == data.location.country
                and loc.city == data.location.city
            ):
                location = loc
                break
            if loc.country == data.location.country:
                location = loc

        if not location:
            location = company_crud.add_location(
                db, company=company, data=data.location
            ).locations[-1]

    application = application_models.Application(
        **(data.dict(exclude={"company", "location"}))
    )

    application.company = company
    application.location = location
    application.date = date.today().strftime("%Y-%m-%d")

    application.user_id = user_id

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_application_files(
    db: Session, user_id
) -> tuple[application_models.Resume, application_models.OtherFiles]:
    user = user_crud.read_by_id(db, id=user_id)
    if not user:
        ...

    return user.resumes, user.other_files


def update_essay(db: Session, user_id, *, data) -> str:
    user = user_crud.read_by_id(db, id=user_id)
    if not user:
        ...

    user.essay = data.get("essay")

    db.add(user)
    db.commit()
    db.refresh(user)

    return user.application_materials.essay


# def update(
#     db: Session,
#     *,
#     db_obj: company_models.Company,
#     data: company_schema.CompanyUpdate | dict[str, Any],
# ) -> company_models.Company:
#     if isinstance(data, dict):
#         update_data = data
#     else:
#         update_data = data.dict(exclude_unset=True)
#     if update_data["password"]:
#         hashed_password = security.get_password_hash(update_data["password"])
#         del update_data["password"]
#         update_data["hashed_password"] = hashed_password
#     return super().update(db, db_obj=db_obj, data=update_data)
