from pydantic import BaseModel


class Response(BaseModel):
    msg: str
    code: int
