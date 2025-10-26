from fastapi import APIRouter, HTTPException
from app.database.connection import user_collection
from app.models.user import User
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/user")
def create_user(user: User):
    user_dict = user.model_dump()
    result = user_collection.insert_one(user_dict)
    return {"id": str(result.inserted_id), "message": "User created successfully"}


@router.get("/user")
def get_users():
    users = list(user_collection.find({}, {"_id": 0}))
    return users


@router.get("/{user_id}")
def get_user(user_id: str):
    user = user_collection.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        user["_id"] = str(user["_id"])
        return user

