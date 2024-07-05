from bson import ObjectId
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_database():
    from config.db import get_database
    return get_database()

async def create_user(user):
    user.password = hash_password(user.password)
    db = get_database()
    db.users.insert_one(user.dict(exclude_unset=True))
    return user

async def get_user(user_id: str):
    db = get_database()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    return user

async def verify_user(username: str, password: str):
    db = get_database()
    user = db.users.find_one({"username": username})
    if user and verify_password(password, user["password"]):
        return True
    return False

async def get_user_by_username(username: str):
    db = get_database()
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
    
async def create_post(username: str, post_content: str):
    db = get_database()
    user = db.users.find_one({"username": username})
    if not user:
        return None
    try:
        result = db.posts.insert_one({"username": username, "post_content": post_content})
        return result.inserted_id
    except Exception as e:
        print(f"Error creating post: {e}")
        return None
    
async def get_user_posts(username: str):
    db = get_database()
    
    # Fetch posts for the user
    posts = db.posts.find({"username": username})
    user_posts = [{"post_id": str(post["_id"]), "post_content": post["post_content"]} for post in posts]
    
    return user_posts