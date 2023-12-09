from pydantic import BaseModel


class CustomResponse(BaseModel):
    msg: str
    code: int

