from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .config import settings
from .services import veo_service, imagen_service, gemini_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    print(f"🚀 Starting {settings.app_name}")
    yield
    # Shutdown
    print("👋 Shutting down")


app = FastAPI(
    title=settings.app_name,
    description="AI Generation Service for NOVA Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "generation"}


@app.post("/generate/video")
async def generate_video(prompt: str, duration: int = 15):
    """Generate video using Veo 2."""
    # TODO: Implement video generation
    return {"job_id": "uuid", "status": "queued"}


@app.post("/generate/image")
async def generate_image(prompt: str, variations: int = 1):
    """Generate image using Imagen 3."""
    # TODO: Implement image generation
    return {"job_id": "uuid", "status": "queued"}


@app.post("/generate/text")
async def generate_text(prompt: str, template: str = "default"):
    """Generate text using Gemini."""
    # TODO: Implement text generation
    return {"result": ""}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
