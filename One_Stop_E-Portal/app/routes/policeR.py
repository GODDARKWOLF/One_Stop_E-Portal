from types import MethodType

from fastapi import APIRouter, HTTPException
from app.database.connection import officer_collection, crime_collection, criminal_record
from app.models.police import PoliceUser, CrimeReport
from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter()


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