from typing import Any

from sqlalchemy.orm import Session

from app.core.security import security
from app.ents.base import crud_base
from app.ents.member import models, schema


class CRUDMember(
    crud_base.CRUDBase[models.Member, schema.MemberCreate, schema.MemberUpdate]
):
    def read_by_email(self, db: Session, *, email: str) -> models.Member | None:
        return (
            db.query(models.Member).filter(models.Member.email == email).first()
        )

    def read_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> list[models.Member]:
        return db.query(models.Member).offset(skip).limit(limit).all()

    def get_full_name(self, data: schema.MemberCreate) -> str:
        return f"{data.first_name} {data.middle_name} {data.last_name}"

    def create(
        self, db: Session, *, data: schema.MemberCreate
    ) -> models.Member:
        data.password = security.get_password_hash(data.password)
        member = models.Member(
            **(data.dict()),
            full_name=self.get_full_name(data),
        )

        db.add(member)
        db.commit()
        db.refresh(member)
        return member

    def update(
        self,
        db: Session,
        *,
        db_obj: models.Member,
        data: schema.MemberUpdate | dict[str, Any],
    ) -> models.Member:
        if isinstance(data, dict):
            update_data = data
        else:
            update_data = data.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = security.get_password_hash(
                update_data["password"]
            )
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)


member = CRUDMember(models.Member)
