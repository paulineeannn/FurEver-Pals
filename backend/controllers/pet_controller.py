from fastapi import HTTPException, status
from typing import List
from bson import ObjectId
from models.pet_model import Pet, AdoptionApplication
from config.db import get_database

# Main database connection
def get_database():
    from config.db import get_database
    return get_database()

# Controller functions
async def add_pet(pet: Pet):
    db = get_database()
    user = db.users.find_one({"username": pet.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Username does not exist")
    db.pets.insert_one(pet.dict(exclude_unset=True))
    return pet

async def get_pet(pet_id: str):
    db = get_database()
    pet = db.pets.find_one({"_id": ObjectId(pet_id)})
    if pet:
        return pet
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")

async def get_pets(username: str):
    db = get_database()
    pets = db.pets.find({"username": username})
    if pets:
        return list(pets)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found for this user")

async def get_all_pets() -> List[dict]:
    db = get_database()
    pets = db.pets.find({}, {"pet_name": 1, "location": 1, "pet_photo": 1})
    if pets:
        formatted_pets = [{"pet_name": pet["pet_name"], "location": pet["location"], "pet_photo": pet["pet_photo"]} for pet in pets]
        return formatted_pets
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found")

async def adopt_pet(pet_id: str, adoption_app: AdoptionApplication):
    db = get_database()
    user = db.users.find_one({"username": adoption_app.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Username does not exist")
    
    pet = db.pets.find_one({"_id": ObjectId(pet_id)})
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")

    if pet["username"] == adoption_app.username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot adopt your own pet")

    db.adoption_applications.insert_one(adoption_app.dict(exclude_unset=True))
    return {"message": f"Adoption application for {pet['pet_name']} submitted successfully"}