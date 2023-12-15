from enum import Enum
from datetime import date
from pydantic import BaseModel


class JobRoles(Enum):
    intern: str = "Intern"
    new_grad: str = "New Grad"


class LocationBase(BaseModel):
    country: str
    city: str = ""


class ReferralMaterials(BaseModel):
    resume: bool = True
    essay: bool = True
    contact: bool = True


class CompanyBase(BaseModel):
    name: str
    image: str = ""


class CompanyCreate(CompanyBase):
    domain: str
    location: LocationBase
    can_refer: bool = True
    referral_materials: ReferralMaterials = None


class CompanyReadBase(CompanyBase):
    id: int
    domain: str
    can_refer: bool = True


class LocationRead(LocationBase):
    id: int


class CompanyRead(CompanyReadBase):
    locations: list[LocationRead]


class ReferralRequest(BaseModel):
    company_id: int
    role: str
    request_note: str
    resume: str
    date: str = date.today().strftime("%Y-%m-%d")


class ReferralStatuses(Enum):
    completed = "Completed"
    in_review = "In review"
    cancelled = "Cancelled"


class ReferralReadBase(BaseModel):
    user_id: int
    role: str
    review_note: str | None = ""
    date: str
    status: ReferralStatuses


class ReferralRead(ReferralReadBase):
    company: CompanyBase


class CompanyReadForReferrals(CompanyReadBase):
    referral_materials: ReferralMaterials
