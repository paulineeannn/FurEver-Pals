from fastapi import APIRouter, Depends, HTTPException, status
from models.user_model import User, LoginModel, UserPost
from controllers.user_controller import (
    register_user, get_user_by_id, verify_user, 
    get_user_by_username, get_user_details_by_username, 
    update_user_details_by_username, post_user_post_action, 
    fetch_all_posts
)

router = APIRouter()

@router.post("/register") #DONE
async def register(user: User):
    # Registers the user and returns the user object
    return await register_user(user)

@router.get("/users/{username}") #DONE
async def get_user_by_username_endpoint(username: str):
    # Fetches user by username
    user = await get_user_by_username(username)
    if user:
        return user
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

@router.post("/login") #DONE
async def login(user: LoginModel):
    # Verifies user credentials for login
    if await verify_user(user.username, user.password):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@router.get("/user-details/{username}") #DONE
async def get_user_details(username: str):
    # Fetches detailed user information by username
    user_details = await get_user_details_by_username(username)
    if user_details:
        return user_details
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User details not found")

@router.put("/update-user-details/{username}") #DONE
async def update_user_details(username: str, new_details: dict):
    # Updates user details by username
    update_result = await update_user_details_by_username(username, new_details)
    return update_result

@router.post("/user-posts/{username}") #DONE
async def create_user_post(username: str, user_post: UserPost):
    # Check the user exists
    post_id = await post_user_post_action(user_post)
    if post_id:
        return {"message": "Post created successfully", "post_id": str(post_id)}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Failed to create post for user '{username}'")

@router.get("/all-user-posts") #DONE
async def get_all_user_posts():
    # Fetches all user posts
    all_posts = await fetch_all_posts()
    if all_posts:
        return {"posts": all_posts}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No posts found")