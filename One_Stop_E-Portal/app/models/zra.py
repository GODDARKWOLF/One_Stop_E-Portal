from datetime import *
#from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field
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
    user_id: Optional[str] = None
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TotalTax(BaseModel):
     id: Optional[str] = None
     year: date
     monthly_collection: list[float] = Field(default_factory=lambda: [0.0] * 12)
     total_sum: float = 0


class Alert(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    message: str
    read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
