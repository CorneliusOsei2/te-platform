from datetime import datetime

from pydantic import BaseModel, EmailStr


class MemberBase(BaseModel):
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


class MemberCreate(MemberBase):
    password: str


class MemberUpdate(MemberBase):
    ...


class MemberInDBBase(MemberBase):
    id: int | None = None
    full_name: str = ""

    class Config:
        orm_mode = True


class MemberInDB(MemberInDBBase):
    password: str


class MemberRead(MemberInDBBase):
    ...
