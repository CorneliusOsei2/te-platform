from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum

import app.ents.application.schema as application_schema
import app.ents.company.schema as company_schema

from app.database.base_class import Base


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    notes = Column(String, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    role = Column(Enum(company_schema.JobRoles), nullable=False)
    title = Column(String, nullable=False)
    status = Column(Enum(application_schema.ApplicationStatuses), nullable=False)
    active = Column(Boolean, nullable=False)

    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="applications")
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="applications")
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    location = relationship("Location", back_populates="application")



class ApplicationMaterials(Base):
    __tablename__ = "application_materials"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    resume = Column(String, nullable=False)
    resume_reviewed = Column(Boolean, nullable=False)
    essay = Column(String, nullable=False)
    essay_reviewed = Column(Boolean, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="application_materials")
    