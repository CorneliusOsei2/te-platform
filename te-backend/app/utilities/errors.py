from pydantic import BaseModel


class UnauthorizedUser(BaseModel):
    msg: str = "User not authorized"


class OperationCompleted(BaseModel):
    msg: str = "Operation completed."
