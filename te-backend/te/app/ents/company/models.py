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

import app.ents.company.schema as company_schema
import app.ents.application.schema as application_schema
from app.database.base_class import Base


class Posting(Base):
    __tablename__ = "postings"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    deadline = Column(DateTime, nullable=False)
    notes = Column(String, nullable=False)
    sponsor = Column(Boolean, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    active = Column(Boolean, nullable=False)
    role = Column(Enum(company_schema.JobRoles), nullable=False)
    status = Column(
        Enum(application_schema.ApplicationStatuses), nullable=False
    )

    # Relationships
    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="postings")


class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    country = Column(String, nullable=False)
    city = Column(String, nullable=False)
    companies = relationship(
        "Company",
        secondary="companies_locations_rel",
        back_populates="locations",
    )
    application = relationship("Application", back_populates="location")


class ReferralMaterials(Base):
    __tablename__ = "referral_materials"
    id = Column(Integer, primary_key=True, index=True)
    resume = Column(Boolean, nullable=False, default=True)
    essay = Column(Boolean, nullable=False, default=True)
    contact = Column(Boolean, nullable=False, default=True)

    # Relationships
    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="referral_materials")


class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=True)
    name = Column(String, index=True, nullable=False)
    domain = Column(String, nullable=True)
    can_refer = Column(Boolean, nullable=True)

    # Relationships
    users = relationship("User", back_populates="company")
    referral_materials = relationship(
        "ReferralMaterials", back_populates="company", uselist=False
    )
    postings = relationship("Posting", back_populates="company")
    applications = relationship("Application", back_populates="company")
    locations = relationship(
        "Location",
        secondary="companies_locations_rel",
        back_populates="companies",
    )


class CompanyLocationRel(Base):
    __tablename__ = "companies_locations_rel"
    __table_args__ = {"extend_existing": True}
    company_id = Column(Integer, ForeignKey("companies.id"), primary_key=True)
    location_id = Column(Integer, ForeignKey("locations.id"), primary_key=True)
