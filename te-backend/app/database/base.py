# Import all the models, so that Base has them before being
# imported by Alembic

from app.database.base_class import Base
from app.ents.user.models import User
from app.ents.application.models import Application, File, ResumeReview
from app.ents.company.models import (
    Company,
    Location,
    Posting,
    CompanyLocationRel,
    Referral,
    ReferralMaterials,
)
from app.ents.learning.models import Lesson
