from types import MethodType

from fastapi import APIRouter, HTTPException
from app.database.connection import officer_collection, crime_collection, criminal_record
from app.models.police import PoliceUser
from bson import ObjectId

router = APIRouter()


@router.post('/police')
def register_officer(officer: PoliceUser):
    officer_dict = officer.model_dump()
    result = officer_collection.insert_one(officer_dict)
    return {'_id': str(result.inserted_id), 'message': 'success'}


@router.get('/police')
def get_police():
    officer = list(officer_collection.find({}, {'_id': 0}))
    return officer

