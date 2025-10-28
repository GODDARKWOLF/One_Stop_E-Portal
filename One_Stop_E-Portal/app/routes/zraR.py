from bson.errors import InvalidId
from fastapi import HTTPException, APIRouter
from app.database.connection import employee_collection, revenue_collection, citizen_tax_collection, alert_collection, criminal_record, user_collection
from app.models.zra import ZraUser, ZraRevenue
from bson import ObjectId


router = APIRouter()



"""
These functions are meant to working for creating, modifying, displaying, and deleting employees from this employees collection.
"""
# routes involving zra employee registration, and search
@router.post('/zra')
def register_zra(zra: ZraUser):
    zra_dict = zra.model_dump(exclude_none=True)
    result = employee_collection.insert_one(zra_dict)
    return {'_id': str(result.inserted_id), 'message': 'success'}


@router.get('/zra')
def get_zra():
    zra = list(employee_collection.find({},{'_id':0}))
    return zra


@router.put("/zra/{zra_id}")
def update_service(zra_id: str, zra: ZraUser):
    try:
        oid = ObjectId(zra_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    service_dict = zra.model_dump(exclude_none=True)
    result = employee_collection.update_one({"_id": oid}, {"$set": service_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'_id': zra_id, 'modified_count': result.modified_count, 'message': 'employee updated successfully'}


@router.delete('/zra/{zra_id}')
def delete_service(zra_id: str):
    try:
        oid = ObjectId(zra_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    result = employee_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="employee not found")
    return {'message': 'Employee deleted successfully'}


"""
These functions are meant to create a revenue document for tax payers and the organization, to analysis all data
"""
@router.post('/revenue')
def create_revenue_doc(zra: ZraRevenue):
    zra_dict = zra.model_dump(exclude_none=True)
    result = revenue_collection.insert_one(zra_dict)
    return {'_id': str(result.inserted_id), 'message': 'success'}


@router.post('/revenue/assign')
def assign_revenue_to_user(user_id: str, revenue_id: str):
    # Validate ids
    try:
        user_oid = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")
    try:
        rev_oid = ObjectId(revenue_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid revenue id")

    # Check existence
    user = user_collection.find_one({"_id": user_oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    revenue = revenue_collection.find_one({"_id": rev_oid})
    if not revenue:
        raise HTTPException(status_code=404, detail="Revenue document not found")

    # Update revenue document to reference the user (store ObjectId in DB)
    revenue_collection.update_one({"_id": rev_oid}, {"$set": {"user_id": user_oid}})

    # Add revenue id to user's revenues array (store ObjectId in DB), create array if not exists
    user_collection.update_one({"_id": user_oid}, {"$addToSet": {"revenues": rev_oid}})

    return {"message": "Revenue assigned to user", "user_id": user_id, "revenue_id": revenue_id}


@router.get('/revenue/{user_id}')
def get_user_revenue(user_id: str):
    try:
        oid = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")
    revenue = revenue_collection.find_one({"user_id": oid})
    if not revenue:
        raise HTTPException(status_code=404, detail="User not found")
    revenue["_id"] = str(revenue["_id"])
    return revenue


@router.delete("/revenue/{revenue_id}")
def delete_service(revenue_id: str):
    try:
        oid = ObjectId(revenue_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    result = revenue_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'message': 'Service deleted successfully'}



"""
These routes deal with citizen taxes 
"""



