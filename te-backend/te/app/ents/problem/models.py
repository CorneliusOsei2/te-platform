from sqlalchemy import (
    Boolean,
    Column,
    Float,
    ForeignKey,
    Integer,
    String,
    Table,
)
from sqlalchemy.orm import relationship
from sqlalchemy.types import Enum

from app.database.base_class import Base
from app.ents.problems.schema import PlatformRoles

problems_platforms = Table(
    "problems_platforms",
    Base.metadata,
    Column("problem_id", ForeignKey("problems.id", ondelete="CASCADE")),
    Column("platform_id", ForeignKey("platforms.id", ondelete="CASCADE")),
)

problems_companies = Table(
    "problems_companies",
    Base.metadata,
    Column("problem_id", ForeignKey("problems.id", ondelete="CASCADE")),
    Column("company_id", ForeignKey("companies.id", ondelete="CASCADE")),
)


class Platform(Base):
    __tablename__ = "platforms"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    notes = Column(String, nullable=False)


class Problem(Base):
    __tablename__ = "problems"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    question = Column(String, index=True, nullable=False)
    solution = Column(String, nullable=False)
    oa = Column(Boolean, nullable=False)
    platforms = relationship(
        "Platform",
        secondary=problems_platforms,
        cascade="delete, save-update, merge",
    )
    companies = relationship(
        "Platform",
        secondary=problems_companies,
        cascade="delete, save-update, merge",
    )

    def __init__(
        self,
        start_date,
        end_date,
        is_active,
    ) -> None:
        self.image = image
        self.university = university
        self.mentor_id = mentor_id
        self.start_date = start_date
        self.end_date = end_date
