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

