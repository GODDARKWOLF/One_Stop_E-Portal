from bson import ObjectId
from pydantic import BaseModel, ConfigDict
from typing import Optional

class Service(BaseModel):
    id: Optional[ObjectId]
    service_name: str

    model_config = ConfigDict(arbitrary_types_allowed=True)


