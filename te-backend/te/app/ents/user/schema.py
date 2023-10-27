from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr
import app.ents.application.schema as application_schema


class UserRoles(Enum):
    mentee = "Mentee"
    mentor = "Mentor"
    admin = "Admin"


class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    middle_name: str = ""
    last_name: str
    full_name: str = ""
    image: str = ""
    date_of_birth: str | None = ""
    contact: str = ""
    address: str = ""
    university: str = ""
    essay: str = ""
    mentor_id: int | None = None
    is_active: bool = True
    role: UserRoles = UserRoles.mentee
    start_date: datetime = datetime.now()
    end_date: datetime = datetime.now()


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    ...
