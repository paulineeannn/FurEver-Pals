from fastapi import APIRouter, HTTPException, status
from typing import List
from models.pet_model import Pet, AdoptionApplication
from controllers.pet_controller import add_pet, get_pet, get_pets, get_all_pets, adopt_pet

router = APIRouter()

@router.post("/add-pet", response_model=Pet) #DONE
async def add_pet_endpoint(pet: Pet):
    try:
        # Add a new pet
        return await add_pet(pet)
    except HTTPException as e:
        raise e  # Raise the HTTPException as is if any error occurs

@router.get("/pets/{pet_id}", response_model=Pet) #DONE
async def get_pet_endpoint(pet_id: str):
    try:
        # Get a pet by ID
        pet = await get_pet(pet_id)
        if not pet:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")
        return pet
    except HTTPException as e:
        raise e  # Raise the HTTPException as is if any error occurs

@router.get("/user-pets/{username}", response_model=List[Pet]) #DONE
async def get_pets_endpoint(username: str):
    try:
        # Get all pets by username
        pets = await get_pets(username)
        if not pets:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found for this user")
        return pets
    except HTTPException as e:
        raise e  # Raise the HTTPException as is if any error occurs

@router.get("/all-pets", response_model=List[dict]) #DONE
async def get_all_pets_endpoint():
    try:
        # Get all pets with limited information
        pets = await get_all_pets()
        if not pets:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found")
        return pets
    except HTTPException as e:
        raise e  # Raise the HTTPException as is if any error occurs

@router.post("/adopt-pet/{pet_id}", status_code=status.HTTP_201_CREATED) #DONE
async def adopt_pet_endpoint(pet_id: str, adoption_app: AdoptionApplication):
    try:
        # Submit an adoption application for a pet
        return await adopt_pet(pet_id, adoption_app)
    except HTTPException as e:
        raise e  # Raise the HTTPException as is if any error occurs