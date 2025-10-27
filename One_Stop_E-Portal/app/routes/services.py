from bson import ObjectId
from fastapi import APIRouter, HTTPException
from app.database.connection import service_collection
from app.models.service import Service
#from bson import ObjectId


router = APIRouter()

@router.post("/service")
def create_service(service: Service):
    service_dict = Service.model_dump(service)
    result = service_collection.insert_one(service_dict)
    return {'_id': str(result.inserted_id), 'message': 'Service created successfully'}


@router.get("/service/{service_id}")
def get_service(service_id: str):
    service = service_collection.find_one({"_id": ObjectId(service_id)})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.put("/service/{service_id}")
def update_service(service_id: str, service: Service):
    service_dict = Service.model_dump(service)
    result = service_collection.update_one({"_id": ObjectId(service_id)}, {"$set": service_dict})
    return {'_id': result.inserted_id, 'message': 'Service updated successfully'}

@router.delete("/{service_id}")
def delete_service(service_id: str):
    service_collection.delete_one({"_id": ObjectId(service_id)})
    return {'message': 'Service deleted successfully'}

@router.get("/service")
def get_services():
    services = list(service_collection.find())
    return services

