from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from models.pet_model import Pet
from controllers.pet_controller import add_pet, get_pet, get_pets, get_all_pets

router = APIRouter()

@router.post("/add-pet", response_model=Pet)
async def add_pet_endpoint(pet: Pet):
    return await add_pet(pet)

@router.get("/pets/{pet_id}", response_model=Pet)
async def get_pet_endpoint(pet_id: str):
    return await get_pet(pet_id)

@router.get("/user-pets/{username}", response_model=List[Pet])
async def get_pets_endpoint(username: str):
    return await get_pets(username)

@router.get("/all-pets", response_model=List[dict])
async def get_all_pets_endpoint():
    return await get_all_pets()