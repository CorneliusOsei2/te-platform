from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import Enum

from app.database.base_class import Base
import app.ents.learning.schema as learning_schema


class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=False)
    link = Column(String, nullable=False)
    subcategory = Column(String, nullable=False)
    instructor = Column(String, nullable=False)
    playlist = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    category = Column(Enum(learning_schema.LessonCategory), nullable=False)
    format = Column(Enum(learning_schema.LessonFormat), nullable=False)
    uploader = Column(Integer, ForeignKey("users.id"), nullable=False)
