from fastapi import HTTPException, status

from services.pet_service import create_pet, get_pet_by_id, get_pets_by_username

async def add_pet(pet):
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