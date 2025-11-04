from types import MethodType

from fastapi import APIRouter, HTTPException
from app.database.connection import officer_collection, crime_collection, criminal_record, user_collection
from app.models.police import PoliceUser, CrimeReport, CriminalRecord
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter()


def _serialize_bson(obj):
    """Recursively convert BSON types (ObjectId) inside dicts/lists to JSON-serializable types."""
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
    Officer registration, search and deletion
"""
@router.post('/police')
def register_officer(officer: PoliceUser):
    officer_dict = officer.model_dump(exclude_none=True)
    result = officer_collection.insert_one(officer_dict)
    return {'_id': str(result.inserted_id), 'message': 'success'}


@router.get('/police')
def get_police():
    officer = list(officer_collection.find({}, {'_id': 0}))
    return officer


@router.delete("/police/{police_id}")
def delete_service(police_id: str):
    try:
        oid = ObjectId(police_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    result = officer_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'message': 'Service deleted successfully'}


"""
Crime reporting route
"""
@router.post('/crime')
def crime_report(report: CrimeReport):
    crime = report.model_dump(exclude_none=True)
    result = crime_collection.insert_one(crime)
    return {'_id': str(result.inserted_id), 'message': 'successfully reported'}


@router.get('/crime')
def get_crimes():
    crime = list(crime_collection.find({}, {'_id': 0}))
    return crime


@router.post('/crime/assign')
def assign_revenue_to_user(reported_by: str, crime_id: str):
    try:
        user_oid = ObjectId(reported_by)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")
    try:
        crime_oid = ObjectId(crime_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid revenue id")


    user = user_collection.find_one({"_id": user_oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")


    crime = crime_collection.find_one({"_id": crime_oid})
    if not crime:
        raise HTTPException(status_code=404, detail="Revenue document not found")

    crime_collection.update_one({"_id": crime_oid}, {"$set": {"user_id": user_oid}})


    user_collection.update_one({"_id": user_oid}, {"$addToSet": {"crime": crime_oid}})

    return {"message": "Revenue assigned to user", "user_id": reported_by, "revenue_id": crime_id}


"""
Routes for criminal records
"""
@router.post('/criminalrecord')
def create_report(record: CriminalRecord):
    record_dict = record.model_dump(exclude_none=True)
    result = criminal_record.insert_one(record_dict)
    return {'_id': str(result.inserted_id), 'message': 'successfully reported'}


@router.post('/criminalrecord/assign')
def adding_user_info(user_id: str, report_id: str):
    try:
        user_oid = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")
    try:
        record_oid = ObjectId(report_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid revenue id")
    user = user_collection.find_one({"_id": user_oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    criminal_record.update_one({"_id": record_oid}, {"$set": {"user_id": user_oid}})

    user_collection.update_one({"_id": user_oid},{"$addToSet": {"report_id": record_oid} })

    return {"message": "Revenue assigned to user", "user_id": user_id, "revenue_id": report_id}


@router.put('/criminalrecord/{report_id}')
def update_service(report_id: str, report: CriminalRecord):
    try:
        oid = ObjectId(report_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid service id")

    service_dict = report.model_dump(exclude_none=True)
    result = criminal_record.update_one({"_id": oid}, {"$set": service_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {'_id': report_id, 'modified_count': result.modified_count, 'message': 'Service updated successfully'}


@router.get('/criminalrecord')
def get_reports(report_id: str):
    try:
        oid = ObjectId(report_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")

    user = user_collection.find_one({"_id": oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return _serialize_bson(user)
