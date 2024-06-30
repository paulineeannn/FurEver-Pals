from fastapi import APIRouter, Depends

from models.user_model import User, LoginModel
from services.user_service import create_user, get_user

from fastapi import APIRouter, Depends, HTTPException, status
from services.user_service import verify_user, get_user_details_by_username, update_user_details_by_username

router = APIRouter()

@router.post("/register")
async def register(user: User):
    return await create_user(user)

@router.get("/users/{user_id}")
async def get_user_by_id(user_id: str):
    return await get_user(user_id)

@router.post("/login")
async def login(user: LoginModel):
    if await verify_user(user.username, user.password):
        return {"message": "successful"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="failed")
    
@router.get("/user-details")
async def get_user_details(username: str):
    return await get_user_details_by_username(username)

@router.put("/update-user-details/{username}")
async def update_user_details(username: str, new_details: dict):
    return await update_user_details_by_username(username, new_details)
