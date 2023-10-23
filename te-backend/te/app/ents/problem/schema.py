from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr


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


class PostingBase(BaseModel):
    email: EmailStr
    first_name: str
    middle_name: str = ""
    last_name: str
    image: str = ""
    date_of_birth: str | None = ""
    contact: str = ""
    address: str = ""
    university: str = ""
    mentor_id: int | None = None
    is_active: bool = True
    start_date: datetime = datetime.now()
    end_date: datetime = datetime.now()


class PostingCreate(PostingBase):
    password: str


class PostingUpdate(PostingBase):
    ...


class PostingInDBBase(PostingBase):
    id: int | None = None
    full_name: str = ""

    class Config:
        orm_mode = True


class PostingInDB(PostingInDBBase):
    password: str


class PostingRead(PostingInDBBase):
    ...
