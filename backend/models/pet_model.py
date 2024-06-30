# from pydantic import BaseModel, validator, Field
# from datetime import datetime
# from typing import Optional
# from enum import Enum

# class Pet(BaseModel):
#     class SexEnum(str, Enum):
#         female = "female"
#         male = "male"

#     username: str
#     name: str = Field(..., min_length=1, max_length=50)
#     age: int
#     sex: SexEnum
#     address: str = Field(..., max_length=250)
#     birthday: datetime
#     photo: Optional[str] = None

#     @validator('age')
#     def age_must_be_positive(cls, v):
#         if v <= 0:
#             raise ValueError('Age must be a positive integer')
#         return v

# from pydantic import BaseModel, validator, Field
# from datetime import datetime
# from typing import Optional
# from enum import Enum
# import os

# class Pet(BaseModel):
#     class SexEnum(str, Enum):
#         female = "female"
#         male = "male"

#     username: str
#     name: str = Field(..., min_length=1, max_length=50)
#     age: Optional[int] = None
#     sex: Optional[SexEnum] = None
#     address: Optional[str] = Field(None, max_length=250)
#     birthday: Optional[datetime] = None
#     photo: str

#     @validator('age', pre=True, always=True)
#     def age_must_be_positive(cls, v):
#         if v is not None and v <= 0:
#             raise ValueError('Age must be a positive integer')
#         return v

#     @validator('birthday', pre=True, always=True)
#     def birthday_cannot_be_future(cls, v):
#         if v is not None and v > datetime.now():
#             raise ValueError('Birthday cannot be in the future')
#         return v

#     @validator('photo')
#     def photo_must_be_file(cls, v):
#         if v is not None and not os.path.isfile(v):
#             raise ValueError('Photo must be a valid file path on the user\'s device')
#         return v

#     @validator('username')
#     def username_non_empty(cls, v):
#         if not v.strip():
#             raise ValueError('Username must not be empty')
#         return v

from pydantic import BaseModel, Field
from typing import Optional
from pydantic import validator

class Pet(BaseModel):
    username: str
    name: str = Field(...)
    age: Optional[int] = Field(None, gt=0)
    sex: Optional[str] = Field(None)
    complete_address: Optional[str] = Field(None)
    fur_pic: bytes = Field(...)

    @validator('name')
    def name_must_be_provided(cls, v):
        if not v:
            raise ValueError("Name must be provided")
        return v

    @validator('fur_pic')
    def fur_pic_must_be_provided(cls, v):
        if not v:
            raise ValueError("Fur picture must be provided")
        return v