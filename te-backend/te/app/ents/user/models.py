from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Table,
)
from sqlalchemy.orm import relationship

from app.database.base_class import Base
import app.ents.user.schema as user_schema
from enum import Enum


class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    reviewed = Column(Boolean, nullable=False)
    notes = Column(String, nullable=False)


users_resumes = Table(
    "users_resumes",
    Base.metadata,
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE")),
    Column("resume_id", ForeignKey("resumes.id", ondelete="CASCADE")),
)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=True)
    first_name = Column(String, index=True, nullable=False)
    middle_name = Column(String, index=True, nullable=True)
    last_name = Column(String, index=True, nullable=False)
    full_name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    contact = Column(String, unique=False, nullable=False)
    address = Column(String, nullable=False)
    password = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    mentor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    university = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    role = Column(Enum(user_schema.UserRoles), nullable=False)
    resumes = relationship(
        "Resume",
        secondary=users_resumes,
        cascade="delete, save-update, merge",
    )

    def __init__(
        self,
        image,
        first_name,
        middle_name,
        last_name,
        full_name,
        email,
        contact,
        address,
        password,
        date_of_birth,
        university,
        mentor_id,
        start_date,
        end_date,
        is_active,
    ) -> None:
        self.image = image
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.full_name = full_name
        self.email = email
        self.contact = contact
        self.address = address
        self.password = password
        self.date_of_birth = date_of_birth
        self.is_active = is_active
        self.university = university
        self.mentor_id = mentor_id
        self.start_date = start_date
        self.end_date = end_date
