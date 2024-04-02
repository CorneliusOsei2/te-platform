import app.ents.application.models as application_models
import app.ents.application.schema as application_schema
import app.ents.company.schema as company_schema


def parse_application(application: application_models.Application):
    application_base = application_schema.ApplicationReadBase(**vars(application))
    new_application = application_schema.ApplicationRead(
        **application_base.dict(),
        company=company_schema.CompanyReadBase(**vars(application.company)),
        location=company_schema.LocationRead(**vars(application.location)),
    )
    return new_application
