from fastapi import HTTPException, APIRouter
from app.database.connection import employee_collection,revenue_collection,citizen_tax_collection,alert_collection, criminal_record
from app.models.zra import ZraUser
from bson import ObjectId


router = APIRouter()


@router.post('/zra')
def register_zra(zra: ZraUser):
    zra_dict = zra.model_dump()
    result = revenue_collection.insert_one(zra_dict)
    return {'_id': str(result.inserted_id), 'message': 'success', 'data': zra_dict}

@router.get('/zra')
def get_zra():
    zra = list(employee_collection.find({},{'_id':0}))
    return zra
