"""
PROGRAM TITLE:
    FurEver Pals - pet_controller.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The pet_controller.py file is a key part of the FurEver Pals system, managing pet-related logic like adding 
    new pets, retrieving pet details, and processing adoption applications. It connects the database with user 
    actions, ensuring proper management of pet data.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
   The purpose of pet_controller.py is to handle pet data, including adding new pets, fetching pet details, 
   and managing adoption applications. It ensures secure and efficient processing of pet-related interactions, 
   enabling smooth adoption processes within the platform.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses MongoDB to store and retrieve pet and adoption data, employing FastAPI's asynchronous 
    functions for efficiency. It handles errors with exception handling, returning appropriate HTTP error messages 
    for reliable pet data interactions.
"""

from fastapi import HTTPException, status
from typing import List
from bson import ObjectId
from models.pet_model import Pet, AdoptionApplication
from config.db import get_database

async def add_pet(pet: Pet):
    # Adds a new pet to the database
    db = get_database()
    user = db.users.find_one({"username": pet.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Username does not exist")
    db.pets.insert_one(pet.dict(exclude_unset=True))
    return pet

async def get_pet(pet_id: str):
    # Fetches a specific pet by ID
    db = get_database()
    pet = db.pets.find_one({"_id": ObjectId(pet_id)})
    if pet:
        return pet
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pet not found")

async def get_pets(username: str):
    # Fetches all pets for a specific user
    db = get_database()
    pets = db.pets.find({"username": username})
    if pets:
        return list(pets)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found for this user")

async def get_all_pets() -> List[dict]:
    # Fetches all pets from the database
    db = get_database()
    pets = db.pets.find({}, {"pet_name": 1, "pet_age": 1, "sex": 1, "location": 1, "description": 1, "username": 1, "pet_photo": 1})
    if pets:
        return [{"pet_name": pet["pet_name"], "pet_age": pet["pet_age"], "sex": pet["sex"], "location": pet["location"], "description": pet["description"], "username": pet["username"], "pet_photo": pet["pet_photo"]} for pet in pets]
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No pets found")

async def adopt_pet(pet_id: str, adoption_app: AdoptionApplication):
    # Processes the adoption application for a specific pet
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