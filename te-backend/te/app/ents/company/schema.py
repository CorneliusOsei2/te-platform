from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr


class JobRoles(Enum):
    intern: str = "Intern"
    new_grad: str = "New Grad"


class ApplicationStatuses(Enum):
    submitted: str = "Submitted"
    oa: str = "OA"
    phone_interview: str = "Phone interview"
    final_interview: str = "Final interview"
    hr_call: str = "HR"
    recruiter_call: str = "Recruiter call"
    offer: str = "Offer"
    not_now: str = "Not now"


class LocationBase(BaseModel):
    country: str
    city: str = ""


class ApplicationBase(BaseModel):
    title: str
    notes: str = ""
    recruiter_name: str = ""
    recruiter_email: str = ""
    active: bool = True
    date: datetime = None
    role: JobRoles
    status: ApplicationStatuses


class ApplicationCreate(ApplicationBase):
    company: str
    location: LocationBase


class CompanyBase(BaseModel):
    name: str
    image: str = ""


class CompanyCreate(CompanyBase):
    domain: str
    location: LocationBase


class CompanyReadBase(CompanyBase):
    id: int
    domain: str


class LocationRead(LocationBase):
    id: int


class CompanyRead(CompanyReadBase):
    locations: list[LocationRead]


class ApplicationReadBase(ApplicationBase):
    id: int


class ApplicationRead(ApplicationBase):
    id: int
    company: CompanyReadBase
    location: LocationRead
