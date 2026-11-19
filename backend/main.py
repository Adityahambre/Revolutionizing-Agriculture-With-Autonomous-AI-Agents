from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.agents import router as agents_router
from app.core.config import settings
from app.api.intelligence import router as intelligence_router
app = FastAPI(
    title="AgriNova API",
    description="Agricultural Intelligence Platform",
    version="1.0.0"
)

# Allow the local Vite development server to call FastAPI.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(agents_router)
app.include_router(intelligence_router)

@app.get("/")
def home():
    return {"message": f"{settings.app_name} API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
