from bson import ObjectId
from pydantic import BaseModel, EmailStr, field_validator, ConfigDict, ValidationError
from typing import Optional


class ZraUser(BaseModel):
    id: Optional[ObjectId]
    name: str
    email: EmailStr
    password: str

    # @field_validator('password')
    # def validate_password(cls, value):
    #     if len(value) < 8 and not value.isalnum:
    #         raise ValueError('password must contain at least 8 characters and should have at least one number.')
    #     return value
    #
    # def validate_email(cls, v):
    #     if not ObjectId.is_valid(v):
    #         raise ValidationError('Invalid email address')
    #     return v

    model_config = ConfigDict(arbitrary_types_allowed=True)