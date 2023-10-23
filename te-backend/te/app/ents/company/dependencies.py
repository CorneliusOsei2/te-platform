import app.ents.company.schema as company_schema
import app.ents.company.models as company_models


def parse_company(company):
    company_base = company_schema.CompanyReadBase(**vars(company))
    new_company = company_schema.CompanyRead(
        **company_base.dict(),
        locations=[
            company_schema.LocationRead(**vars(loc))
            for loc in company.locations
        ],
    )
    return new_company


def parse_application(application: company_models.Application):
    application_base = company_schema.ApplicationReadBase(**vars(application))
    new_application = company_schema.ApplicationRead(
        **application_base.dict(),
        company=company_schema.CompanyReadBase(**vars(application.company)),
        location=company_schema.LocationRead(**vars(application.location)),
    )
    return new_application


"""
class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    notes = Column(String, nullable=False)
    recruiter_name = Column(String, nullable=False)
    recruiter_email = Column(String, nullable=False)
    role = Column(Enum(company_schema.JobRoles), nullable=False)
    status = Column(Enum(company_schema.ApplicationStatuses), nullable=False)
    active = Column(Boolean, nullable=False)

    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="applications")
    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="applications")
    location_id = Column(Integer, ForeignKey("locations.id"))
    location = relationship("Location", back_populates="application")
"""
