import app.ents.application.schema as application_schema
from app.database.base_class import Base
from sqlalchemy import Boolean, Column, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    notes = Column(String, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    role = Column(String, nullable=False)
    title = Column(String, nullable=False)
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


class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(String, nullable=False)
    date = Column(String, nullable=False)
    link = Column(String, nullable=False)
    name = Column(String, nullable=False)
    reviewed = Column(Boolean, nullable=False, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="files")
    active = Column(Boolean, nullable=False, default=True)
    type = Column(Enum(application_schema.FileType), nullable=False)


class ResumeReview(Base):
    __tablename__ = "resume_review"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    link = Column(String, nullable=False)
    name = Column(String, nullable=False)

    # Relationships
    requester_id = Column(Integer, ForeignKey("users.id"))
    reviewers_id = Column(Integer, ForeignKey("users.id"))
    requester = relationship(
        "User", back_populates="resume_review_requests", foreign_keys=[requester_id]
    )
    reviewers = relationship(
        "User", back_populates="resume_reviews", foreign_keys=[reviewers_id]
    )
