from bson import ObjectId
from pydantic import BaseModel, EmailStr
from typing import Optional


class ZraUser(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    password: str


class ZraRevenue(BaseModel):
    id: Optional[str] = None
    name: str
    work: str
    monthly_salary: float
    tax_collected: float
    remaining_salary: float
    # optional reference to a user (stored in DB as ObjectId)
    user_id: Optional[str] = None

