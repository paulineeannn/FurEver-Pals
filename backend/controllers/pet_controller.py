from fastapi import HTTPException, status
from typing import List
from services.pet_service import (
    create_pet, 
    get_pet_by_id, 
    get_pets_by_username, 
    user_exists, 
    get_all_pets as get_all_pets_service, 
    create_adoption_application
)
from models.pet_model import Pet, AdoptionApplication

async def add_pet(pet: Pet):
    if not await user_exists(pet.username):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Username does not exist")
    return await create_pet(pet)

async def get_pet(pet_id: str):
    pet = await get_pet_by_id(pet_id)
    if pet:
        return pet
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")

async def get_pets(username: str):
    pets = await get_pets_by_username(username)
    if pets:
        return pets
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found for this user")

async def get_all_pets() -> List[dict]:
    pets = await get_all_pets_service()
    if pets:
        formatted_pets = [{"pet_name": pet["pet_name"], "location": pet["location"], "pet_photo": pet["pet_photo"]} for pet in pets]
        return formatted_pets
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found")

async def adopt_pet(pet_id: str, adoption_app: AdoptionApplication):
    if not await user_exists(adoption_app.username):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Username does not exist")
    
    pet = await get_pet_by_id(pet_id)
    
    if not pet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")

    if pet["username"] == adoption_app.username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot adopt your own pet")

    await create_adoption_application(adoption_app)
    return {"message": f"Adoption application for {pet['pet_name']} submitted successfully"}