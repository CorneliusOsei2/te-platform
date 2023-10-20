from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import Token, security
from app.ents.member import crud, dependencies, models, schema

router = APIRouter(prefix="/members")


@router.post("/login/access-token", response_model=Token)
def login_access_token(
    db: Session = Depends(dependencies.get_db),
    data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    member = crud.member.authenticate(
        db, email=data.username, password=data.password
    )
    if not member:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password"
        )
    elif not crud.member.is_active(member):
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return {
        "access_token": security.create_access_token(
            member.id, expires_delta=access_token_expires
        ),
        "type": "bearer",
    }


@router.post("/login/test-token", response_model=schema.MemberRead)
def test_token(
    current_member: models.Member = Depends(dependencies.get_current_member),
) -> Any:
    """
    Test access token
    """
    return current_member


# @router.post("/password-recovery/{email}", response_model=schema.Msg)
# def recover_password(email: str, db: Session = Depends(dependencies.get_db)) -> Any:
#     """
#     Password Recovery
#     """
#     member = crud.member.read_by_email(db, email=email)

#     if not member:
#         raise HTTPException(
#             status_code=404,
#             detail="The member with this username does not exist in the system.",
#         )
#     password_reset_token = utils.generate_password_reset_token(email=email)
#     utils.send_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token  # type: ignore  Column--warning
#     )
#     return {"schemas.Msg": "Password recovery email sent"}


# @router.post("/reset-password/", response_model=schemas.Msg)
# def reset_password(
#     token: str = Body(...),
#     new_password: str = Body(...),
#     db: Session = Depends(dependencies.get_db),
# ) -> Any:
#     """
#     Reset password
#     """
#     email = utils.verify_password_reset_token(token)
#     if not email:
#         raise HTTPException(status_code=400, detail="Invalid token")
#     member = crud.member.read_by_email(db, email=email)
#     if not member:
#         raise HTTPException(
#             status_code=404,
#             detail="The member with this username does not exist in the system.",
#         )
#     elif not crud.member.is_active(member):
#         raise HTTPException(status_code=400, detail="Inactive member")
#     hashed_password = get_password_hash(new_password)
#     member.hashed_password = hashed_password  # type: ignore  Column--warning
#     db.add(member)
#     db.commit()
#     return {"schemas.Msg": "Password updated successfully"}
