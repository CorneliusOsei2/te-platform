from datetime import date
from enum import Enum

from pydantic import BaseModel


class LessonFormat(Enum):
    video = "video"
    pdf = "pdf"
    html = "html"


class WorkshopBase(BaseModel):
    topic: str
    link: str
    format: LessonFormat = LessonFormat.video
    playlist: str
    year: int = 2023
    instructor: str = ""


class WorkshopCreate(WorkshopBase):
    author: str = ""


class WorkshopRead(WorkshopBase):
    id: int


class DataStructuresAndAlgorithmsBase(BaseModel):
    topic: str
    link: str
    format: LessonFormat = LessonFormat.video
    playlist: str


class DataStructuresAndAlgorithmsCreate(DataStructuresAndAlgorithmsBase):
    author: str = ""


class DataStructuresAndAlgorithmsRead(DataStructuresAndAlgorithmsBase):
    id: int


class SystemDesignBase(BaseModel):
    topic: str
    link: str
    format: LessonFormat = LessonFormat.video
    playlist: str


class SystemDesignCreate(SystemDesignBase):
    author: str = ""


class SystemDesignRead(SystemDesignBase):
    id: int


class MiscellaneousBase(BaseModel):
    topic: str
    link: str
    format: LessonFormat = LessonFormat.video
    playlist: str


class MiscellaneousCreate(MiscellaneousBase):
    author: str = ""


class MiscellaneousRead(MiscellaneousBase):
    id: int
