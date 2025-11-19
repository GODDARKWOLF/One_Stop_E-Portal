from bson.errors import InvalidId
from fastapi import HTTPException, APIRouter
from app.database.connection import employee_collection, revenue_collection, alert_collection, user_collection
from app.models.zra import ZraUser, ZraRevenue, Alert , TotalTax
from bson import ObjectId
from datetime import *


router = APIRouter()


def _serialize_bson(obj):
    """Simple recursive serializer for ObjectId and nested structures."""
    from bson import ObjectId

    if obj is None:
        return None
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, dict):
        return {k: _serialize_bson(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_serialize_bson(v) for v in obj]
    return obj



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


@router.get('/revenue/{revenue_id}')
def get_user_revenue(revenue_id: str):
    try:
        oid = ObjectId(revenue_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid revenue id")

    revenue = revenue_collection.find_one({"_id": oid})
    if not revenue:
        raise HTTPException(status_code=404, detail="Revenue document not found")

    # Convert ObjectId fields to strings for JSON
    revenue["_id"] = str(revenue["_id"])
    if revenue.get("user_id") is not None:
        try:
            revenue["user_id"] = str(revenue["user_id"])
        except Exception:
            # leave as-is if not an ObjectId
            pass
    return revenue


@router.delete("/revenue/{revenue_id}")
def delete_service(revenue_id: str):
    try:
        oid = ObjectId(revenue_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid revenue id")

    result = revenue_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="revenue document not found")
    return {'message': 'revenue document deleted successfully'}



"""
These routes deal with citizen taxes 
"""

@router.get("/taxes/{year}", response_model=TotalTax)
def get_yearly_tax_totals(year: int):
    if year < 1900 or year > 9999:
        raise HTTPException(status_code=400, detail="Invalid year")

    # Build date range for the year (timezone-aware)
    start = datetime(year, 1, 1, tzinfo=timezone.utc)
    end = datetime(year + 1, 1, 1, tzinfo=timezone.utc)

    pipeline = [
        {"$match": {"date": {"$gte": start, "$lt": end}}},
        {"$group": {
            "_id": {"month": {"$month": "$date"}},   # Mongo returns 1..12
            "month_total": {"$sum": {"$ifNull": ["$tax_collected", 0]}}
        }},
        {"$project": {"month": "$_id.month", "month_total": 1, "_id": 0}}
    ]

    try:
        results = list(revenue_collection.aggregate(pipeline))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    # results is list of { "month": 1..12, "month_total": <sum> }
    monthly = [0.0] * 12
    for r in results:
        m = int(r["month"]) - 1
        monthly[m] = float(r.get("month_total", 0.0))

    total = sum(monthly)

    return TotalTax(year=year, monthly_collection=monthly, total_sum=total)


"""
Routes that involve alerting the employees
"""

@router.post("/alerts")
def create_alert(alert: Alert):
    alert_dict = alert.model_dump(exclude_none=True)
    result = alert_collection.insert_one(alert_dict)
    alert_dict["_id"] = str(result.inserted_id)
    return {"_id": str(result.inserted_id), "message": "alert created", "alert": _serialize_bson(alert_dict)}


@router.post('/alert/assign')
def assign_revenue_to_user(user_id: str, alert_id: str):
    try:
        user_oid = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")
    try:
        alert_oid = ObjectId(alert_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid alert id")


    user = user_collection.find_one({"_id": user_oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    alert = alert_collection.find_one({"_id": alert_oid})
    if not alert:
        raise HTTPException(status_code=404, detail="Alert document not found")

    alert_collection.update_one({"_id": alert_oid}, {"$set": {"user_id": user_oid}})

    user_collection.update_one({"_id": user_oid}, {"$addToSet": {"alert": alert_oid}})

    return {"message": "Alert assigned to user", "user_id": user_id, "alert_id": alert_id}


@router.get('/alerts')
def list_alerts():
    alerts = list(alert_collection.find())
    return [_serialize_bson(a) for a in alerts]


@router.get('/alerts/{alert_id}')
def get_alert(alert_id: str):
    try:
        oid = ObjectId(alert_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail='Invalid alert id')
    a = alert_collection.find_one({'_id': oid})
    if not a:
        raise HTTPException(status_code=404, detail='Alert not found')
    return _serialize_bson(a)


@router.delete('/alerts/{alert_id}')
def delete_alert(alert_id: str):
    try:
        oid = ObjectId(alert_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail='Invalid alert id')
    result = alert_collection.delete_one({'_id': oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Alert not found')
    return {'message': 'Alert deleted'}


@router.post('/alerts/ack/{alert_id}')
def acknowledge_alert(alert_id: str):
    try:
        oid = ObjectId(alert_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail='Invalid alert id')
    result = alert_collection.update_one({'_id': oid}, {'$set': {'read': True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail='Alert not found')
    return {'message': 'Alert acknowledged'}
