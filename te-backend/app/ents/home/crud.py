import app.ents.home.models as home_models
from sqlalchemy.orm import Session


def read_team(db: Session) -> home_models.Team | None:
    return db.query(home_models.Team).all()


def read_beneficiaries(db: Session) -> home_models.Beneficiary | None:
    return db.query(home_models.Team).all()


def read_partners(db: Session) -> home_models.Partner | None:
    return db.query(home_models.Partner).all()
