import app.ents.company.schema as company_schema


def parse_company(company):
    company_base = company_schema.CompanyReadBase(**vars(company))
    new_company = company_schema.CompanyRead(
        **company_base.dict(),
        locations=[
            company_schema.LocationRead(**vars(loc)) for loc in company.locations
        ],
        referral_materials=company_schema.ReferralMaterials(
            **vars(company.referral_materials)
        ),
    )
    return new_company


def parse_company_for_referrals(user_id, company):
    def current_user_request():
        for referral in company.referrals:
            if referral.id == user_id:
                return referral
        return None

    company_base = company_schema.CompanyReadBase(**vars(company))
    referral = current_user_request()
    return company_schema.CompanyReadForReferrals(
        **company_base.dict(),
        countries=set([loc.country for loc in company.locations]),
        referral_materials=company_schema.ReferralMaterials(
            **vars(company.referral_materials)
        ),
        referral=company_schema.Referral(**vars(referral)) if referral else None,
    )
