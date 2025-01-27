from fastapi import Depends
from bson import ObjectId
from passlib.context import CryptContext
from models.user_model import UserPost
from config.db import get_database
from datetime import datetime

# Initialize password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Helper functions for password hashing and verification
def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Main database connection
def get_database():
    from config.db import get_database
    return get_database()

# Controller functions
async def register_user(user):
    user.password = hash_password(user.password)
    db = get_database()
    db.users.insert_one(user.dict(exclude_unset=True))
    return user

async def get_user_by_id(user_id: str):
    db = get_database()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    return user

async def post_user_post_action(user_post: UserPost):
    db = get_database()
    username = user_post.username
    post_content = user_post.sharedpost
    date_posted = user_post.date_posted
    
    user = db.users.find_one({"username": username})
    if not user:
        return None
    try:
        result = db.posts.insert_one({"username": username, "post_content": post_content, "date_posted": date_posted})
        return result.inserted_id
    except Exception as e:
        print(f"Error creating post: {e}")
        return None

async def fetch_all_posts():
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
    db = get_database()
    user = db.users.find_one({"username": username})
    if user and verify_password(password, user["password"]):
        return True
    return False

async def get_user_by_username(username: str):
    db = get_database()
    print(f"Searching for user with username: {username}")
    user = db.users.find_one({"username": username})
    if user:
        return {
            "bdate": user.get("birthday"),
            "email": user.get("email"),
            "address": user.get("address")
        }
    return None

async def get_user_details_by_username(username: str):
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
            "pet_knowledge":user.get("pet_knowledge"),
            "stable_living":user.get("stable_living"),
            "flex_time_sched":user.get("flex_time_sched"),
            "environment":user.get("environment"),
            "profile_photo":user.get("profile_photo"),
        }
    else:
        return None
    
async def update_user_details_by_username(username: str, new_details: dict):
    db = get_database()
    result = db.users.update_one({"username": username}, {"$set": new_details})
    if result.modified_count == 1:
        return {"message": "User details updated successfully"}
    else:
        return {"message": "Failed to update user details"}