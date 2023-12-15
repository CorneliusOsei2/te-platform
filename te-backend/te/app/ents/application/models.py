from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database.base_class import Base


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    notes = Column(String, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    # role = Column(Enum(company_schema.JobRoles), nullable=False)
    role = Column(String, nullable=False)
    title = Column(String, nullable=False)
    # status = Column(
    #     Enum(application_schema.ApplicationStatuses), nullable=False
    # )
    status = Column(String, nullable=False)
    referred = Column(Boolean, nullable=False)
    active = Column(Boolean, default=True, nullable=False)
    archived = Column(Boolean, nullable=False)

    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="applications")
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="applications")
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    location = relationship("Location", back_populates="application")


class Resume(Base):
    __tablename__ = "resumes"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(String, nullable=False)
    date = Column(String, nullable=False)
    link = Column(String, nullable=False)
    name = Column(String, nullable=False)
    reviewed = Column(Boolean, nullable=False, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="resumes")
    active = Column(Boolean, nullable=False, default=True)


class OtherFiles(Base):
    __tablename__ = "other_files"
    __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    link = Column(String, nullable=False)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="other_files")
