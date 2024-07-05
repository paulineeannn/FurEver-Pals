from pydantic import BaseModel, Field, validator
from typing import Optional

class Pet(BaseModel):
    pet_name: str = Field(..., min_length=1, max_length=100)
    pet_age: Optional[int] = Field(None, gt=0)
    sex: Optional[str] = Field(None, pattern='^(female|male)$')
    location: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    pet_photo: bytes = Field(...)
    username: str = Field(..., min_length=1)

    @validator('pet_photo')
    def pet_photo_must_be_provided(cls, v):
        if not v:
            raise ValueError("Pet photo must be provided")
        return v