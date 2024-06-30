from fastapi import APIRouter, Depends, HTTPException, status

from models.pet_model import Pet
from services.pet_service import create_pet, get_pet_by_id, get_pets_by_username

router = APIRouter()

@router.post("/add-pet")
async def add_pet(pet: Pet):
    return await create_pet(pet)

@router.get("/pets/{pet_id}")
async def get_pet(pet_id: str):
    return await get_pet_by_id(pet_id)

@router.get("/user-pets/")
async def get_pets(username: str):
    return await get_pets_by_username(username)