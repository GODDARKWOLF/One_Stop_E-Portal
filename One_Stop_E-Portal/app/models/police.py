from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone
#from app.custom.funtions import checker

class PoliceUser(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    password: str


class CrimeReport(BaseModel):
    id: Optional[str] = None
    type_of_crime: str
    description: str
    reported_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    reported_by: Optional[str] = None


class CriminalRecord(BaseModel):
    id: Optional[str] = None
    User_id: Optional[int] = None
    crime_committed: str = None
    gender: str
    age: int
    sentence: Optional[str] = None


