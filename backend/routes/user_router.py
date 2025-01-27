"""
PROGRAM TITLE:
    FurEver Pals - user_router.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The user_router.py file is part of the API layer in the FurEver Pals system, defining FastAPI routes to 
    handle user-related client requests. It connects the frontend to the backend by providing API endpoints 
    for actions like creating accounts, logging in, and updating profiles.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
   The purpose of user_router.py is to provide API endpoints for user operations such as registration, login, 
   viewing user details, and creating posts. It ensures smooth interaction between the client interface and 
   the backend logic, enabling efficient user management.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The file uses FastAPI's APIRouter to define routes and manage request and response flow, relying on 
    controller functions from user_controller.py. It validates user input and handles errors with FastAPI's 
    HTTPException, using Pydantic models to define data format and validation rules for user data.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from models.user_model import User, LoginModel, UserPost
from controllers.user_controller import (
    register_user, get_user_by_id, verify_user, 
    get_user_by_username, get_user_details_by_username, 
    update_user_details_by_username, post_user_post_action, 
    fetch_all_posts
)

# Initialize router
router = APIRouter()

@router.post("/register")
async def register_endpoint(user: User):
    # Register a new user
    return await register_user(user)

@router.get("/users/{username}")
async def get_user_by_username_endpoint(username: str):
    # Get user information by username
    user = await get_user_by_username(username)
    if user:
        return user
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

@router.post("/login")
async def login_endpoint(user: LoginModel):
    # User login endpoint to verify credentials
    if await verify_user(user.username, user.password):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@router.get("/user-details/{username}")
async def get_user_details_endpoint(username: str):
    # Fetch detailed user information by username
    user_details = await get_user_details_by_username(username)
    if user_details:
        return user_details
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User details not found")

@router.put("/update-user-details/{username}")
async def update_user_details_endpoint(username: str, new_details: dict):
    # Update user details by username
    update_result = await update_user_details_by_username(username, new_details)
    return update_result

@router.post("/user-posts/{username}")
async def create_user_post_endpoint(username: str, user_post: UserPost):
    # Create a post for a specific user
    post_id = await post_user_post_action(user_post)
    if post_id:
        return {"message": "Post created successfully", "post_id": str(post_id)}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Failed to create post for user '{username}'")

@router.get("/all-user-posts")
async def get_all_user_posts_endpoint():
    # Fetch all posts from users
    all_posts = await fetch_all_posts()
    if all_posts:
        return {"posts": all_posts}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No posts found")