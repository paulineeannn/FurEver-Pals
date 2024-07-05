from bson import ObjectId

def get_database():
    from config.db import get_database
    return get_database()

async def user_exists(username: str):
    db = get_database()
    user = db.users.find_one({"username": username})
    return user is not None

async def create_pet(pet):
    db = get_database()
    db.pets.insert_one(pet.dict(exclude_unset=True))
    return pet

async def get_pet_by_id(pet_id: str):
    db = get_database()
    pet = db.pets.find_one({"_id": ObjectId(pet_id)})
    return pet

async def get_pets_by_username(username: str):
    db = get_database()
    pets = db.pets.find({"username": username})
    return list(pets)