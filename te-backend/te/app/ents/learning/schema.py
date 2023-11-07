from datetime import date
from enum import Enum

from pydantic import BaseModel


class WorkshopBase(BaseModel):
    topic: str
    link: str
    playlist: str
    year: int
    instructor: str = ""


class WorkshopCreate(WorkshopBase):
    author: str = ""


class WorkshopRead(WorkshopBase):
    id: int


class DataStructuresAndAlgorithmsBase(BaseModel):
    topic: str
    link: str
    playlist: str


class DataStructuresAndAlgorithmsCreate(DataStructuresAndAlgorithmsBase):
    author: str = ""


class DataStructuresAndAlgorithmsRead(DataStructuresAndAlgorithmsBase):
    id: int


class SystemDesignBase(BaseModel):
    topic: str
    link: str
    playlist: str


class SystemDesignCreate(SystemDesignBase):
    author: str = ""


class SystemDesignRead(SystemDesignBase):
    id: int


class MiscellaneousBase(BaseModel):
    topic: str
    link: str
    playlist: str


class MiscellaneousCreate(MiscellaneousBase):
    author: str = ""


class MiscellaneousRead(MiscellaneousBase):
    id: int
