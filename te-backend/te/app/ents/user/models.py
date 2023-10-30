from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum

import app.ents.user.schema as user_schema
from app.database.base_class import Base


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
    university = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    role = Column(Enum(user_schema.UserRoles), nullable=False)
    essay = Column(String, index=True, nullable=True)

    # Relationships
    mentor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    company = relationship("Company", back_populates="users")
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)
    resumes = relationship("Resume", back_populates="user")
    other_files = relationship("OtherFiles", back_populates="user")
    applications = relationship("Application", back_populates="user")
    referrals = relationship("Referral", back_populates="user")
