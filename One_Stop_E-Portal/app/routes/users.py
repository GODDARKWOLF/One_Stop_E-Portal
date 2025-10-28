from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, HTTPException
from app.database.connection import user_collection
from app.models.user import User

router = APIRouter()

@router.post("/user")
def create_user(user: User):
    user_dict = user.model_dump(exclude_none=True)
    result = user_collection.insert_one(user_dict)
    return {"id": str(result.inserted_id), "message": "User created successfully"}


@router.get("/user")
def get_users():
    users = list(user_collection.find({}, {"_id": 0}))
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
    user["_id"] = str(user["_id"])
    return user

