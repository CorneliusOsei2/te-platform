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
from sqlalchemy.types import Enum

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
    status = Column(Enum(company_schema.ApplicationStatuses), nullable=False)
    active = Column(Boolean, nullable=False)

    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="applications")
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="applications")
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    location = relationship("Location", back_populates="application")


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
    status = Column(Enum(company_schema.ApplicationStatuses), nullable=False)

    # Relationships
    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="postings")


class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    country = Column(String, nullable=False)
    city = Column(String, nullable=False)
    companies = relationship(
        "Company", secondary="companies_locations", back_populates="locations"
    )
    application = relationship("Application", back_populates="location")


class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=True)
    name = Column(String, index=True, nullable=False)
    domain = Column(String, nullable=True)

    # Relationships
    postings = relationship("Posting", back_populates="company")
    applications = relationship("Application", back_populates="company")
    locations = relationship(
        "Location", secondary="companies_locations", back_populates="companies"
    )


class CompanyLocation(Base):
    __tablename__ = "companies_locations"
    company_id = Column(Integer, ForeignKey("companies.id"), primary_key=True)
    location_id = Column(Integer, ForeignKey("locations.id"), primary_key=True)
