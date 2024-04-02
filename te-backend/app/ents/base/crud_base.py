from typing import Any, Generic, Type, TypeVar

from app.database.base_class import Base
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType", bound=Base)  # type: ignore
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def read(self, db: Session, id: Any) -> ModelType:
        return db.query(self.model).filter(self.model.id == id).first()

    def read_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> list[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, data: CreateSchemaType) -> ModelType:
        data_data = jsonable_encoder(data)
        db_obj = self.model(**data_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: ModelType, data: UpdateSchemaType
    ) -> ModelType:
        encoded_data = jsonable_encoder(db_obj)
        if isinstance(data, dict):
            update_data = data
        else:
            update_data = data.dict(exclude_unset=True)
        for field in encoded_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, *, id: int) -> ModelType:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj
