from pydantic import BaseModel, EmailStr, validator, Field
from datetime import datetime
from typing import Optional
from datetime import datetime

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