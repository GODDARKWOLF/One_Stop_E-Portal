from bson import ObjectId
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional

class User(BaseModel):
    id: Optional[ObjectId] = None
    name: str
    email: EmailStr
    password: str
    role: str

    model_config = ConfigDict(arbitrary_types_allowed=True)