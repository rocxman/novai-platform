from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings for Alibaba Cloud DashScope."""
    
    # Application
    app_name: str = "NOVA AI Generation Service"
    debug: bool = False
    
    # Alibaba Cloud DashScope
    dashscope_api_key: str = "sk-923407d300a844e08ed633a1be452b64"
    dashscope_region: str = "singapore"  # singapore, beijing, us
    
    # API Endpoints (auto-configured based on region)
    @property
    def base_url(self) -> str:
        """Get base URL based on region."""
        urls = {
            "singapore": "https://dashscope-intl.aliyuncs.com",
            "beijing": "https://dashscope.aliyuncs.com",
            "us": "https://dashscope-us.aliyuncs.com",
        }
        return urls.get(self.dashscope_region, urls["singapore"])
    
    # AI Models - Alibaba Cloud (2026 Free Tier Optimized)
    # Text to Image: Qwen-Image-Max (best for text rendering in images)
    qwen_image_model: str = "qwen-image-max"
    
    # Text to Video: Wan2.6-i2v (latest, supports 15s ultra-long)
    wan_t2v_model: str = "wan2.6-i2v"
    
    # Image to Video: Wan2.6-i2v (same model, maintains facial details)
    wan_i2v_model: str = "wan2.6-i2v"
    
    # Text Generation: Qwen3-Max (flagship for complex tasks)
    qwen_text_model: str = "qwen3-max"
    
    # Alternative Fast Model: Qwen-Plus (balanced speed/intelligence)
    qwen_fast_model: str = "qwen-plus"
    
    # Multimodal: Qwen3-VL-Plus (visual understanding)
    qwen_vl_model: str = "qwen3-vl-plus"
    
    # Coding: Qwen3-Coder-Next (specialized for programming)
    qwen_coder_model: str = "qwen3-coder-next"
    
    # Redis (for job queue)
    redis_url: str = "redis://localhost:6379"
    
    # Alibaba Cloud OSS (Object Storage Service)
    oss_bucket: str = "novai-assets"
    oss_region: str = "ap-southeast-1"
    oss_access_key_id: str = ""
    oss_access_key_secret: str = ""
    oss_endpoint: str = "oss-ap-southeast-1.aliyuncs.com"
    
    # API
    api_url: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
