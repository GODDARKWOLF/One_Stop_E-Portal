from bson import ObjectId
from pydantic import BaseModel, EmailStr
from typing import Optional


class ZraUser(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    password: str


class ZraRevenue(BaseModel):
    #global monthly_salary, tax_collected
    id: Optional[str] = None
    name: str
    work: str
    monthly_salary: float = 0
    tax_collected: float = 0
    remaining_salary: float = monthly_salary - tax_collected
    # optional reference to a user (stored in DB as ObjectId)
    user_id: Optional[str] = None

