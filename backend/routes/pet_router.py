"""
PROGRAM TITLE:
    FurEver Pals - pet_router.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The pet_router.py file is a key part of the FurEver Pals system, defining API routes for managing pet data 
    and adoption processes. It connects the frontend with the backend by exposing endpoints for actions like 
    adding pets, viewing details, and submitting adoption applications.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
   The purpose of pet_router.py is to handle all pet-related API requests, such as adding new pets, retrieving 
   pet information, and processing adoption applications. It enables the client-side application to interact 
   with pet data and ensures proper error handling for invalid data.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The file uses FastAPI's APIRouter to define modular routes, which are linked to controller functions in 
    pet_controller.py. It employs Pydantic models like Pet and AdoptionApplication for data formatting, and 
    handles exceptions with HTTPException to ensure correct responses and maintain data integrity.
"""

from fastapi import APIRouter, HTTPException, status
from typing import List
from models.pet_model import Pet, AdoptionApplication
from controllers.pet_controller import add_pet, get_pet, get_pets, get_all_pets, adopt_pet

# Initialize router
router = APIRouter()

@router.post("/add-pet", response_model=Pet)
async def add_pet_endpoint(pet: Pet):
    # Add a new pet to the database
    try:
        return await add_pet(pet)
    except HTTPException as e:
        raise e

@router.get("/pets/{pet_id}", response_model=Pet)
async def get_pet_endpoint(pet_id: str):
    # Get a pet by its ID
    try:
        pet = await get_pet(pet_id)
        if not pet:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")
        return pet
    except HTTPException as e:
        raise e

@router.get("/user-pets/{username}", response_model=List[Pet])
async def get_pets_endpoint(username: str):
    # Get all pets associated with a user
    try:
        pets = await get_pets(username)
        if not pets:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found for this user")
        return pets
    except HTTPException as e:
        raise e

@router.get("/all-pets", response_model=List[dict])
async def get_all_pets_endpoint():
    # Get all pets in the database
    try:
        pets = await get_all_pets()
        if not pets:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found")
        return pets
    except HTTPException as e:
        raise e

@router.post("/adopt-pet/{pet_id}", status_code=status.HTTP_201_CREATED)
async def adopt_pet_endpoint(pet_id: str, adoption_app: AdoptionApplication):
    # Adopt a pet by submitting an adoption application
    try:
        return await adopt_pet(pet_id, adoption_app)
    except HTTPException as e:
        raise e