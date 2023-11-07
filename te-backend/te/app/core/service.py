from google.oauth2 import service_account
from googleapiclient.discovery import build

credentials_file = "app/core/google_drive_creds.json"


def get_drive_service():
    creds = service_account.Credentials.from_service_account_file(
        credentials_file, scopes=["https://www.googleapis.com/auth/drive"]
    )
    drive_service = build("drive", "v3", credentials=creds)
    return drive_service
