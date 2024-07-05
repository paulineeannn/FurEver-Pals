from bson import ObjectId

def get_database():
    from config.db import get_database
    return get_database()

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

async def user_exists(username: str):
    db = get_database()
    user = db.users.find_one({"username": username})
    return user is not None

async def get_all_pets():
    db = get_database()
    pets = db.pets.find({}, {"pet_name": 1, "location": 1, "pet_photo": 1})
    return list(pets)

async def create_adoption_application(adoption_app):
    db = get_database()
    db.adoption_applications.insert_one(adoption_app.dict(exclude_unset=True))
    return adoption_app