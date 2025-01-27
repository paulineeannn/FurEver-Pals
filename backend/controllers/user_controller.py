"""
PROGRAM TITLE:
    FurEver Pals - user_controller.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The user_controller.py file is essential for managing user-related logic in the FurEver Pals application. 
    It handles user registration, login authentication, post management, and updating user details while 
    interacting with the database.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
    The purpose of user_controller.py is to manage user actions, such as creating accounts, authenticating 
    logins, handling posts, and updating profiles. It ensures secure password handling and efficient data 
    storage and retrieval from the database, providing smooth user interaction.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses bcrypt for secure password hashing and pymongo for MongoDB queries to manage user data. 
    It employs FastAPI's asynchronous patterns for efficient operations, handling errors with proper HTTP 
    messages and validating data before processing.
"""

from fastapi import HTTPException, status
from bson import ObjectId
from passlib.context import CryptContext
from models.user_model import UserPost
from config.db import get_database
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Hashes the user's password using bcrypt
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verifies if the plain password matches the hashed password
    return pwd_context.verify(plain_password, hashed_password)

async def register_user(user: UserPost):
    # Registers a new user by inserting their data into the database
    user.password = hash_password(user.password)
    db = get_database()
    db.users.insert_one(user.dict(exclude_unset=True))
    return user

async def get_user_by_id(user_id: str):
    # Fetches a user by their ID
    db = get_database()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

async def post_user_post_action(user_post: UserPost):
    # Creates a post for a specific user
    db = get_database()
    username = user_post.username
    post_content = user_post.sharedpost
    date_posted = user_post.date_posted
    
    user = db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    try:
        result = db.posts.insert_one({"username": username, "post_content": post_content, "date_posted": date_posted})
        return result.inserted_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error creating post: {str(e)}")

async def fetch_all_posts():
    # Fetches all posts from the database
    db = get_database()
    posts = db.posts.find()
    all_posts = []

    for post in posts:
        user = db.users.find_one({"username": post["username"]})
        if user:
            all_posts.append({
                "username": post["username"],
                "post_id": str(post["_id"]),
                "post_content": post["post_content"],
                "date_posted": post["date_posted"],
                "profile_photo": user.get("profile_photo"), 
            })
    
    return all_posts

async def verify_user(username: str, password: str):
    # Verifies if the user's credentials are valid
    db = get_database()
    user = db.users.find_one({"username": username})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    return True

async def get_user_by_username(username: str):
    # Fetches a user by their username
    db = get_database()
    print(f"Searching for user with username: {username}")
    user = db.users.find_one({"username": username})
    if user:
        return {
            "bdate": user.get("birthday"),
            "email": user.get("email"),
            "address": user.get("address")
        }
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

async def get_user_details_by_username(username: str):
    # Fetches detailed user information by their username
    db = get_database()
    user = db.users.find_one({"username": username})
    if user:
        return {
            "birthday": user.get("birthday"),
            "firstname": user.get("firstname"),
            "lastname": user.get("lastname"),
            "email": user.get("email"),
            "mobilenum": user.get("mobilenum"),
            "address": user.get("address"),
            "pet_knowledge": user.get("pet_knowledge"),
            "stable_living": user.get("stable_living"),
            "flex_time_sched": user.get("flex_time_sched"),
            "environment": user.get("environment"),
            "profile_photo":user.get("profile_photo"),
        }
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
async def update_user_details_by_username(username: str, new_details: dict):
    # Updates the user's details by their username
    db = get_database()
    result = db.users.update_one({"username": username}, {"$set": new_details})
    if result.modified_count == 1:
        return {"message": "User details updated successfully"}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to update user details")