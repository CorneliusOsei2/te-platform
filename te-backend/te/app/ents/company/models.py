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
from app.ents.companies.schema import PostingRoles
from app.database.base_class import Base
from enum import Enum

class Posting(Base):
    __tablename__ = "postings"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    deadline = Column(DateTime, nullable=False)
    role = Column(Enum(PostingRoles), nullable=False)
    notes = Column(String, nullable=False)
    status = Column(Enum(PostingStatus), nullable=False)
    sponsor = Column(Boolean, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    active = Column(Boolean, nullable=False)


companies_postings = Table(
    "companies_postings",
    Base.metadata,
    Column("company_id", ForeignKey("companies.id", ondelete="CASCADE")),
    Column("posting_id", ForeignKey("postings.id", ondelete="CASCADE")),
)


class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, nullable=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String, nullable=False)
    postings = relationship(
        "Posting",
        secondary=companies_postings,
        cascade="delete, save-update, merge",
    )

    def __init__(
        self,
        image,
        name,
        location,
    ) -> None:
        self.image = image
        self.name = name
        self.location = location
