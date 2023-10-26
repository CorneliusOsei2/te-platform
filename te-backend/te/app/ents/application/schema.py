from datetime import datetime
from enum import Enum

from pydantic import BaseModel
import app.ents.company.schema as company_schema

class Essay(BaseModel):
    essay: str
    
class Resume(BaseModel):
    resume: str
    
class ApplicationStatuses(Enum):
    submitted: str = "Submitted"
    oa: str = "OA"
    phone_interview: str = "Phone interview"
    final_interview: str = "Final interview"
    hr_call: str = "HR"
    recruiter_call: str = "Recruiter call"
    offer: str = "Offer"
    not_now: str = "Not now"


class ApplicationBase(BaseModel):
    title: str
    notes: str = ""
    recruiter_name: str = ""
    recruiter_email: str = ""
    active: bool = True
    date: datetime = None
    role: company_schema.JobRoles
    status: ApplicationStatuses


class ApplicationCreate(ApplicationBase):
    company: str
    location: company_schema.LocationBase


class ApplicationReadBase(ApplicationBase):
    id: int


class ApplicationRead(ApplicationBase):
    id: int
    company: company_schema.CompanyReadBase
    location: company_schema.LocationRead
