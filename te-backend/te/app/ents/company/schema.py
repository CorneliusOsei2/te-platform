from enum import Enum

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
    referral_materials: ReferralMaterials = None


class CompanyReadBase(CompanyBase):
    id: int
    domain: str


class LocationRead(LocationBase):
    id: int


class CompanyRead(CompanyReadBase):
    locations: list[LocationRead]


class ReferralRequest(BaseModel):
    company_id: int
    role: str
    notes: str


class ReferralStatuses(Enum):
    requested = "Requested"
    approved = "Approved"
    review = "In review"


class CompanyReadForReferrals(CompanyReadBase):
    countries: set[str]
    referral_materials: ReferralMaterials
