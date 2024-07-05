from fastapi import APIRouter, Depends, HTTPException, status
from models.user_model import User, LoginModel, UserPost
from controllers.user_controller import fetch_user_posts
from services.user_service import (
    create_user,
    get_user, 
    verify_user, 
    get_user_details_by_username, 
    update_user_details_by_username,
    create_post
)

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

@router.post("/user-posts/{username}")
async def create_user_post(username: str, post: UserPost):
    post_content = post.sharedpost
    post_id = await create_post(username, post_content)
    
    if post_id:
        return {"message": "Post created successfully", "post_id": str(post_id)}
    else:
        return {"message": f"Failed to create post for user '{username}'. User not found or other error occurred."}

@router.get("/user-posts/{username}")
async def get_user_posts(username: str):
    user_posts = await fetch_user_posts(username)
    
    if not user_posts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No posts found for user '{username}'")
    
    return {
        "username": username,
        "posts": user_posts
    }
