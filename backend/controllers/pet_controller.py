from fastapi import HTTPException, status

from services.pet_service import create_pet, get_pet_by_id, get_pets_by_username, user_exists
from models.pet_model import Pet

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