# Import all the models, so that Base has them before being
# imported by Alembic
from app.database.base_class import Base
from app.ents.user.models import User
from app.ents.application.models import Resume
from app.ents.application.models import OtherFiles


from app.ents.company.models import Company
from app.ents.company.models import Posting
from app.ents.application.models import Application
from app.ents.company.models import Location
from app.ents.company.models import CompanyLocationRel
