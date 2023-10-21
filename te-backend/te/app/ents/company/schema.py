from datetime import datetime

from pydantic import BaseModel, EmailStr
from enum import Enum


class PostingRoles(Enum):
    intern: str = "Intern"
    new_grad: str = "New Grad"


class PostingStatus(Enum):
    not_applied: str = "Not applied"
    submitted: str = "Submitted"
    oa: str = "OA"
    phone_interview: str = "Phone interview"
    final_interview: str = "Final interview"
    hr_call: str = "HR call"
    offer: str = "Offer"
    not_now: str = "Not now"


class CompanyBase(BaseModel):
    name: str
    image: str = ""
    location: str = ""


class CompanyCreate(CompanyBase):
    ...


class CompanyUpdate(CompanyBase):
    ...


class CompanyInDBBase(CompanyBase):
    id: int | None = None

    class Config:
        orm_mode = True


class CompanyInDB(CompanyInDBBase):
    ...


class CompanyRead(CompanyInDBBase):
    ...
