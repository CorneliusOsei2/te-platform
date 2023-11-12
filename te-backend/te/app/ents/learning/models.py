from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
)
from sqlalchemy.types import Enum

from app.database.base_class import Base
import app.ents.learning.schema as learning_schema


class Workshop(Base):
    __tablename__ = "workshops"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    format = Column(Enum(learning_schema.LessonFormat), nullable=False)
    instructor = Column(String, nullable=True)
    playlist = Column(String, nullable=True)
    year = Column(Integer, nullable=True)
    author = Column(String, nullable=True)


class DataStructuresAndAlgorithms(Base):
    __tablename__ = "data_structures_and_algorithms"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    format = Column(Enum(learning_schema.LessonFormat), nullable=False)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)


class SystemDesign(Base):
    __tablename__ = "system_design"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    format = Column(Enum(learning_schema.LessonFormat), nullable=False)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)


class Miscellaneous(Base):
    __tablename__ = "miscellaneous"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    format = Column(Enum(learning_schema.LessonFormat), nullable=False)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)
