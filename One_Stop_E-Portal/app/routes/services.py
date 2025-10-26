from fastapi import APIRouter, HTTPException
from app.database.connection import service_collection
from app.models.service import Service
#from bson import ObjectId


router = APIRouter()

@router.post("/service")
def create_service(service: Service):
    service_dict = service.model_dump()
    result = service_collection.insert_one(service_dict)
    return {"id": str(result.inserted_id), "message": "Service created successfully"}


@router.get("/services")
def get_services():
        services = list(service_collection.find({}, {"_id": 0}))
        return {"services": services}


@router.get("/services/{service_name}")
def get_service(service_name: str):
    user = service_collection.find_one({"service_name": service_name})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        service_name = str(user["service_name"])
        return {"service_name": service_name}



@router.delete("/service/{service_name}")
def delete_service(service_name: str):
    user = service_collection.find_one({"service_name": service_name})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        service_collection.delete_one({"service_name": service_name})
        return {"id": str(user.id)}

