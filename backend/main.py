from fastapi import FastAPI
from routes.user_router import router as user_router
from routes.pet_router import router as pet_router
import os

app = FastAPI()

app.include_router(user_router)
app.include_router(pet_router)

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    
    print(f"Server is running on port {port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
