from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, HTTPException
from app.database.connection import user_collection
from app.models.user import User

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

@router.post("/user")
def create_user(user: User):
    user_dict = user.model_dump(exclude_none=True)
    result = user_collection.insert_one(user_dict)
    return {"id": str(result.inserted_id), "message": "User created successfully"}


@router.get("/user")
def get_users():
    # Return all users and make sure any ObjectId values are converted to strings
    users_cursor = user_collection.find()
    users = [_serialize_bson(u) for u in users_cursor]
    return users


@router.get("/user/{user_id}")
def get_user(user_id: str):
    try:
        oid = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user id")

    user = user_collection.find_one({"_id": oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return _serialize_bson(user)

