from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core import config, security
from app.ents.member import crud, models
from app.ents.user.dependencies import get_db

# * Storing JWT in cookies
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{config.settings.API_STR}/members/login/access-token"
)


def get_current_member(
    db: Session = Depends(get_db), access_token: str = Cookie()
) -> models.Member:
    try:
        payload = jwt.decode(
            token=access_token,
            key=config.settings.SECRET_KEY,
            algorithms=["HS256"],
        )
        token_data = security.TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    member = crud.member.read(db, id=token_data.sub)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


def get_current_active_member(
    current_member: models.Member = Depends(get_current_member),
) -> models.Member:
    if not crud.member.is_active(current_member):
        raise HTTPException(status_code=400, detail="Inactive member")
    return current_member
