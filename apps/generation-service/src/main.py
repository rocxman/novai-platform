from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel, Field
from typing import Optional, List

from .config import settings
from .services import (
    qwen_image_service,
    wan_t2v_service,
    wan_i2v_service,
    qwen_text_service,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    print(f"🚀 Starting {settings.app_name} (Alibaba Cloud DashScope)")
    yield
    print("👋 Shutting down")


app = FastAPI(
    title=settings.app_name,
    description="AI Generation Service using Alibaba Cloud DashScope",
    version="2.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class TextToImageRequest(BaseModel):
    prompt: str = Field(..., max_length=2000)
    variations: int = Field(default=1, ge=1, le=4)
    resolution: str = Field(default="1024*1024")
    style: str = Field(default="photorealistic")
    negative_prompt: Optional[str] = Field(default=None, max_length=500)
    seed: Optional[int] = None


class TextToVideoRequest(BaseModel):
    prompt: str = Field(..., max_length=1500)
    duration: int = Field(default=10, ge=5, le=60)
    resolution: str = Field(default="1280*720")
    negative_prompt: Optional[str] = Field(default=None, max_length=500)
    seed: Optional[int] = None


class ImageToVideoRequest(BaseModel):
    image_url: str
    motion_prompt: str = Field(..., max_length=1000)
    duration: int = Field(default=5, ge=3, le=10)
    resolution: str = Field(default="1280*720")
    negative_prompt: Optional[str] = Field(default=None, max_length=500)
    seed: Optional[int] = None


class TextGenerationRequest(BaseModel):
    prompt: str
    template: str = Field(default="video_script")
    tone: str = Field(default="professional")
    max_tokens: int = Field(default=8192)
    temperature: float = Field(default=0.7)


# Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "generation",
        "provider": "Alibaba Cloud DashScope",
        "region": settings.dashscope_region,
    }


@app.post("/generate/image")
async def generate_image(request: TextToImageRequest):
    """Generate images using Qwen-Image."""
    try:
        results = await qwen_image_service.generate(
            prompt=request.prompt,
            variations=request.variations,
            resolution=request.resolution,
            style=request.style,
            negative_prompt=request.negative_prompt,
            seed=request.seed,
        )
        return {"job_id": "sync", "status": "completed", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate/video")
async def generate_video(request: TextToVideoRequest):
    """Generate video using Wanxiang Wan (Text to Video)."""
    try:
        result = await wan_t2v_service.generate(
            prompt=request.prompt,
            duration=request.duration,
            resolution=request.resolution,
            negative_prompt=request.negative_prompt,
            seed=request.seed,
        )
        return {"job_id": "sync", "status": "completed", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate/image-to-video")
async def generate_image_to_video(request: ImageToVideoRequest):
    """Generate video from image using Wanxiang Wan."""
    try:
        result = await wan_i2v_service.generate(
            image_url=request.image_url,
            motion_prompt=request.motion_prompt,
            duration=request.duration,
            resolution=request.resolution,
            negative_prompt=request.negative_prompt,
            seed=request.seed,
        )
        return {"job_id": "sync", "status": "completed", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate/text")
async def generate_text(request: TextGenerationRequest):
    """Generate text using Qwen."""
    try:
        result = await qwen_text_service.generate(
            prompt=request.prompt,
            template=request.template,
            tone=request.tone,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
        )
        return {"result": result, "model": settings.qwen_text_model}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
