"""
PROGRAM TITLE:
    FurEver Pals - pet_model.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The pet_model.py file handles modeling pet-related information and adoption applications within the 
    FurEver Pals system. It ensures pet data and adoption requests are structured and validated before 
    being stored in the database, integrating with the system's data layer.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
    The purpose of pet_model.py is to define the data structures for pet details and adoption applications, 
    ensuring that all input data is accurate and valid. It uses Pydantic for validation, checking required 
    fields like pet name, photo, and adoption application details.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses Pydantic to define schemas for pet data and adoption applications, with validation rules 
    for fields like pet name, age, and sex. It also validates adoption details such as personal information, 
    pet care plans, and identity documents, ensuring only correctly formatted data is processed.
"""

from pydantic import BaseModel, Field, validator
from typing import Optional

class Pet(BaseModel):
    pet_name: str = Field(..., min_length=1, max_length=100)
    pet_age: Optional[int] = Field(None, gt=0)
    sex: Optional[str] = Field(None, pattern='^(Female|Male)$')
    location: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None)
    pet_photo: bytes = Field(...)
    username: str = Field(..., min_length=1)

    @validator('pet_photo')
    def validate_pet_photo(cls, v):
        # Ensure that a pet photo is provided
        if not v:
            raise ValueError("Pet photo must be provided")
        return v
    
class AdoptionApplication(BaseModel):
    username: str = Field(..., min_length=1, max_length=100)
    name: str = Field(..., min_length=1, max_length=100)
    address: Optional[str] = Field(None)
    occupation: Optional[str] = Field(None)
    responsible_for_pet_care: Optional[str] = Field(None)
    plan_to_care_for_pet: Optional[str] = Field(None)
    clinic_name: Optional[str] = Field(None)
    reason_for_adopting: Optional[str] = Field(None)
    proof_of_identity_photo: bytes = Field(...)

    @validator('proof_of_identity_photo')
    def validate_proof_of_identity_photo(cls, v):
        # Ensure that proof of identity photo is provided
        if not v:
            raise ValueError("Proof of identity photo must be provided")
        return v