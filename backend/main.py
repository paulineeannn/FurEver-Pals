"""
PROGRAM TITLE:
    FurEver Pals - main.py

PROGRAMMER/S:
    Ashley Sheine N. Jugueta

WHERE THE PROGRAM FITS IN THE GENERAL SYSTEM DESIGNS:
    The main.py file is the central part of the backend for the FurEver Pals application. It initializes the 
    FastAPI framework, loads route configurations, and integrates user and pet routers to manage related data.

DATE WRITTEN:
    May 8, 2024

DATE REVISED:
    January 25, 2025

PURPOSE:
    The main.py file's purpose is to set up and run the FastAPI web application, allowing the server to handle 
    requests for user and pet data. It also configures the server to run on port 8000 by default.

DATA STRUCTURES, ALGORITHMS, AND CONTROL:
    The program uses FastAPI to structure the application into modular components with routers for user and 
    pet management. It handles environment variables for server port settings and uses uvicorn to run the server, 
    which responds to API requests.
"""

from fastapi import FastAPI
from routes.user_router import router as user_router
from routes.pet_router import router as pet_router
import os

app = FastAPI()

# Including routers for user and pet functionalities
app.include_router(user_router)
app.include_router(pet_router)

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))  # Default to port 8000
    
    print(f"Server is running on port {port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)