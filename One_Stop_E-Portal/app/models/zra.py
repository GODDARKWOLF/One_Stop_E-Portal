from pydantic import BaseModel, EmailStr
from typing import Optional


class ZraUser(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    password: str