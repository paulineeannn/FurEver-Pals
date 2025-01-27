"""
PROGRAM TITLE:
    FurEver Pals - user_model.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The user_model.py file is essential for managing and structuring user-related data in the FurEver Pals 
    application. It ensures user data, such as registration details and login credentials, is validated and 
    consistent, acting as the data model layer that integrates with the database.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
    The purpose of user_model.py is to define the structure of user data, including account registration, 
    login, and posts. It uses Pydantic models to validate and ensure the data meets required criteria, 
    helping maintain data integrity throughout the application.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses the Pydantic library to define structured models for user data, such as User, LoginModel, 
    and UserPost, with validation checks for fields like username, email, and password. The control flow 
    ensures that data is validated and cleaned automatically before being used in the application.
"""

from pydantic import BaseModel, EmailStr, validator, Field
from datetime import datetime
from typing import Optional

class User(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    firstname: str = Field(..., min_length=1, max_length=100)
    middlename: Optional[str] = Field(None, max_length=100)
    lastname: str= Field(..., min_length=1, max_length=100)
    birthday: datetime
    mobilenum: str = Field(..., pattern=r'^09\d{9}$')
    address: str = Field(..., max_length=250)
    pet_knowledge: int = Field(..., ge=0, le=5)
    stable_living: int = Field(..., ge=0, le=5)
    flex_time_sched: int = Field(..., ge=0, le=5)
    environment: int = Field(..., ge=0, le=5)
    profile_photo: bytes = Field(...)

    @validator('birthday')
    def invalid_birthday(cls, v):
        # Ensure that the birthday is in the past
        if v >= datetime.now():
            raise ValueError('birthday must be in the past')
        return v
    
class LoginModel(BaseModel):
    username: str
    password: str

class UserPost(BaseModel):
    username: str
    sharedpost: str
    date_posted: datetime