from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    username: str
    password: str


class MemberBase(BaseModel):
    email: EmailStr
    name: str
    image: str = ""
    is_active: bool = True
    linkedin: str = ""
    github: str = ""
    note: str = ""


class Team(MemberBase):
    ...


class Beneficiary(MemberBase):
    ...


class Partner(BaseModel):
    name: str
    image: str = ""
