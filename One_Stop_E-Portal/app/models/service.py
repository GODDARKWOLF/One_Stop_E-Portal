from pydantic import BaseModel
from typing import Optional


class Service(BaseModel):
    # Use string ids in the API layer; convert to ObjectId only when interacting with MongoDB
    id: Optional[str] = None
    service_name: str


