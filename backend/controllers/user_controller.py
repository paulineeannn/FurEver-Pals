from fastapi import Depends

from services.user_service import create_user, get_user, create_post, get_user_posts
from models.user_model import UserPost

async def register_user(user):
    return await create_user(user)

async def get_user_by_id(user_id: str):
    return await get_user(user_id)

async def post_user_post_action(user_post: UserPost):
    return await create_post(user_post)

async def fetch_user_posts(username: str):
    return await get_user_posts(username)