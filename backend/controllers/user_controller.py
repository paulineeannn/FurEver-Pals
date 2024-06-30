from fastapi import Depends

from services.user_service import create_user, get_user

async def register_user(user):
    return await create_user(user)

async def get_user_by_id(user_id: str):
    return await get_user(user_id)