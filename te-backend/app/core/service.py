from google.oauth2 import service_account
from googleapiclient.discovery import build
from pydantic_settings import BaseSettings


class GDriveCredentials(BaseSettings):
    type: str
    project_id: str
    private_key_id: str
    private_key: str
    client_email: str
    client_id: str
    auth_uri: str
    token_uri: str
    auth_provider_x509_cert_url: str
    client_x509_cert_url: str
    universe_domain: str

    class Config:
        env_file = ".gdrive.env"


credentials = GDriveCredentials()
credentials_file = "app/core/google_drive_creds.json"


def get_drive_service():
    # creds = service_account.Credentials.from_service_account_info(credentials.dict())
    creds = service_account.Credentials.from_service_account_file(credentials_file)
    drive_service = build("drive", "v3", credentials=creds)
    return drive_service
