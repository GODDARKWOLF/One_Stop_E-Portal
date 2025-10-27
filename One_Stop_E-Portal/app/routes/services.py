from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, HTTPException
from app.database.connection import service_collection
from app.models.service import Service



router = APIRouter()

@router.post("/service")
def create_service(service: Service):
    # Use instance model_dump and exclude None so we don't send a null id
    service_dict = service.model_dump(exclude_none=True)
    result = service_collection.insert_one(service_dict)
    return {'_id': str(result.inserted_id), 'message': 'Service created successfully'}


@router.get("/service")
def get_services():
    services = list(service_collection.find())
    # Convert ObjectId to str for JSON serialization
    for s in services:
        if s.get('_id') is not None:
            s['_id'] = str(s['_id'])
    return services


@router.get("/service/{service_id}")
def get_service(service_id: str):
    try:
        oid = ObjectId(service_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    service = service_collection.find_one({"_id": oid})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service['_id'] = str(service['_id'])
    return service

@router.put("/service/{service_id}")
def update_service(service_id: str, service: Service):
    try:
        oid = ObjectId(service_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    service_dict = service.model_dump(exclude_none=True)
    result = service_collection.update_one({"_id": oid}, {"$set": service_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'_id': service_id, 'modified_count': result.modified_count, 'message': 'Service updated successfully'}

@router.delete("/service/{service_id}")
def delete_service(service_id: str):
    try:
        oid = ObjectId(service_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    result = service_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'message': 'Service deleted successfully'}



