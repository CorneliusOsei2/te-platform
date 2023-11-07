from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
)

from app.database.base_class import Base

class Workshop(Base):
    __tablename__ = "workshops"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    instructor = Column(String, nullable=True)
    playlist = Column(String, nullable=True)
    year = Column(Integer, nullable=True)
    author = Column(String, nullable=True)


class DataStructuresAndAlgorithms(Base):
    __tablename__ = "data_structures_and_algorithms"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)


class SystemDesign(Base):
    __tablename__ = "system_design"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    is_video = Column(Boolean, nullable=True)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)


class Miscellaneous(Base):
    __tablename__ = "miscellaneous"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=True)
    link = Column(String, nullable=True)
    is_video = Column(Boolean, nullable=True)
    playlist = Column(String, nullable=True)
    author = Column(String, nullable=True)
    
    