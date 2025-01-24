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
    def pet_photo_must_be_provided(cls, v):
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
    def proof_of_identity_photo_must_be_provided(cls, v):
        if not v:
            raise ValueError("Proof of identity photo must be provided")
        return v