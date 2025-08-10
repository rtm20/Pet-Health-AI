from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.health_analysis import router as health_router

app = FastAPI(title="Pet Health AI API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health_router, prefix="/api/v1/health", tags=["health"])

@app.get("/")
async def root():
    return {"message": "Welcome to Pet Health AI API"}
