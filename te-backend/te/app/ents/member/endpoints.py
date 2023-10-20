from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.ents import user
from app.ents.member import auth, crud, dependencies, models, schema

router = APIRouter(prefix="/members")


@router.post("/login")
def login_member(
    response: Response, token=Depends(auth.login_access_token)
) -> Any:
    """
    Log Member in.
    """
    # response.headers[
    #     "Authorization"
    # ] = f'{token.get("type")} {token.get("access_token")}'
    response.set_cookie(
        key="access_token", value=token.get("access_token"), samesite=None
    )
    return token


@router.get(".list", response_model=list[schema.MemberRead])
def get_members(
    db: Session = Depends(dependencies.get_db),
    skip: int = 0,
    limit: int = 100,
    # _: str = Depends(dependencies.get_current_member),
) -> Any:
    """
    Retrieve Members.
    """
    members = crud.member.read_multi(db, skip=skip, limit=limit)
    return members


@router.post(".create", response_model=schema.MemberRead)
def create_member(
    *,
    db: Session = Depends(dependencies.get_db),
    data: schema.MemberCreate,
    # _=Depends(get_current_member),
) -> Any:
    """
    Create an Member.
    """
    member = crud.member.read_by_email(db, email=data.email)
    if member:
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "email": member.email,
                    "message": "The member with this email already exists!",
                }
            },
        )

    member = crud.member.create(db, data=data)
    return member


@router.put(".info/{user_id}", response_model=schema.MemberRead)
def update_member(
    *,
    db: Session = Depends(dependencies.get_db),
    data: schema.MemberUpdate,
    member: models.Member = Depends(dependencies.get_current_member),
) -> Any:
    """
    Update Member.
    """
    member = crud.member.read(db, id=member.id)
    if not member:
        raise HTTPException(
            status_code=404,
            detail={
                "error": {
                    "email": member.email,
                    "message": "The member with this member name does not exist in the system",
                }
            },
        )
    member = crud.member.update(db, db_obj=member, data=data)
    return user
