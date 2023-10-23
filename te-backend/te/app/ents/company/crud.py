from typing import Any
from datetime import datetime
from sqlalchemy.orm import Session

import app.ents.company.models as company_models
import app.ents.company.schema as company_schema
from app.core.security import security
from app.ents.base import crud_base
from app.core.config import settings


def read_company_by_name(
    db: Session, *, name: str
) -> company_models.Company | None:
    return (
        db.query(company_models.Company)
        .filter(company_models.Company.name == name)
        .first()
    )


def read_company_multi(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[company_models.Company]:
    return db.query(company_models.Company).offset(skip).limit(limit).all()


def create_company(
    db: Session, *, data: company_schema.CompanyCreate
) -> company_models.Company:
    company = company_models.Company(**(data.dict(exclude={"location"})))
    company.image = (
        (settings.CLEAR_BIT_BASE_URL + data.domain) if data.domain else ""
    )
    location = company_models.Location(**data.location.dict())
    company.locations.append(location)

    db.add(location)
    db.add(company)
    db.commit()
    db.refresh(company)
    return company


def add_location(
    db: Session,
    *,
    company: company_models.Company,
    data: company_schema.LocationBase,
):
    location = company_models.Location(**data.dict())
    company.locations.append(location)

    db.add(location)
    db.add(company)
    db.commit()
    db.refresh(location)
    db.refresh(company)
    return company


def create_application(
    db: Session, *, data: company_schema.ApplicationCreate
) -> company_models.Company:
    location = None
    company = read_company_by_name(db, name=data.company)
    if not company:
        company = create_company(
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
            location = add_location(
                db, company=company, data=data.location
            ).locations[-1]

    application = company_models.Application(
        **(data.dict(exclude={"company", "location"}))
    )

    print(
        f"""
        {location}
        """
    )
    application.company = company
    application.location = location
    application.date = datetime.now()

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def read_application_multi(
    db: Session, *, skip: int = 0, limit: int = 100
) -> list[company_models.Application]:
    return db.query(company_models.Application).offset(skip).limit(limit).all()


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
