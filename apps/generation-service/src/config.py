from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings for Alibaba Cloud DashScope."""
    
    # Application
    app_name: str = "NOVA AI Generation Service"
    debug: bool = False
    
    # Alibaba Cloud DashScope
    dashscope_api_key: str = ""
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
    
    # AI Models - Alibaba Cloud
    # Text to Image: Qwen-Image series
    qwen_image_model: str = "qwen-image-2.0-pro"
    
    # Text to Video: Wanxiang Wan series
    wan_t2v_model: str = "wan2.6-t2v"
    
    # Image to Video: Wanxiang Wan series
    wan_i2v_model: str = "wan2.1-i2v"
    
    # Text Generation: Qwen series
    qwen_text_model: str = "qwen-max"
    
    # Redis (for job queue)
    redis_url: str = "redis://localhost:6379"
    
    # Alibaba Cloud OSS (Object Storage Service)
    oss_bucket: str = "novai-assets"
    oss_region: str = "ap-southeast-1"
    oss_access_key_id: str = ""
    oss_access_key_secret: str = ""
    oss_endpoint: str = "oss-ap-southeast-1.aliyuncs.com"
    
    # API
    api_url: str = "http://localhost:8080"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
