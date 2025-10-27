from bson import ObjectId
from pydantic import BaseModel, EmailStr, ConfigDict, field_validator, ValidationError
from typing import Optional

class User(BaseModel):
    id: Optional[ObjectId]
    name: str
    email: EmailStr
    password: str

    @field_validator('email')
    def validate_email(cls, v):
        if not ObjectId.is_valid(v):
            raise ValidationError('Invalid email address')
        return v

    @field_validator('password')
    def validate_password(cls, v):
        if len(v) < 8 and  not v.isalnum:
            raise ValidationError('Password must be at least 8 characters long and must have at least one number')
        return v

    model_config = ConfigDict(arbitrary_types_allowed=True)