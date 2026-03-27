from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # Application
    app_name: str = "NOVA AI Generation Service"
    debug: bool = False
    
    # Google AI
    google_ai_api_key: str = ""
    vertex_project_id: str = ""
    vertex_location: str = "us-central1"
    
    # AI Models
    veo_model: str = "veo-2.0-generate-001"
    imagen_model: str = "imagen-3.0-generate-001"
    gemini_model: str = "gemini-1.5-pro"
    
    # Redis
    redis_url: str = "redis://localhost:6379"
    
    # Google Cloud Storage
    gcs_bucket: str = "novai-assets"
    gcs_project_id: str = ""
    
    # API
    api_url: str = "http://localhost:8080"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
