"""Alibaba Cloud DashScope service for AI generation."""

import asyncio
import httpx
from typing import Optional, List, Dict, Any
from datetime import datetime

from .config import settings


class DashScopeService:
    """Service for calling Alibaba Cloud DashScope APIs."""
    
    def __init__(self):
        self.api_key = settings.dashscope_api_key
        self.base_url = settings.base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
    
    async def create_task(self, endpoint: str, payload: dict) -> dict:
        """Create an async task."""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}{endpoint}",
                headers={**self.headers, "X-DashScope-Async": "enable"},
                json=payload,
            )
            response.raise_for_status()
            return response.json()
    
    async def get_task_status(self, task_id: str, endpoint: str) -> dict:
        """Poll task status."""
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                f"{self.base_url}{endpoint}/{task_id}",
                headers=self.headers,
            )
            response.raise_for_status()
            return response.json()
    
    async def poll_until_complete(
        self, 
        task_id: str, 
        endpoint: str, 
        poll_interval: int = 5,
        max_attempts: int = 120
    ) -> dict:
        """Poll task until completion."""
        for attempt in range(max_attempts):
            result = await self.get_task_status(task_id, endpoint)
            status = result.get("output", {}).get("task_status", "UNKNOWN")
            
            if status in ["SUCCEEDED", "FAILED", "CANCELED"]:
                return result
            
            await asyncio.sleep(poll_interval)
        
        raise TimeoutError(f"Task {task_id} did not complete within timeout")


class QwenImageService:
    """Text to Image generation using Qwen-Image."""

    def __init__(self):
        self.dashscope = DashScopeService()
        self.model = settings.qwen_image_model
        self.endpoint = "/api/v1/services/aigc/text2image/image-synthesis"
        self.task_endpoint = "/api/v1/tasks"
    
    async def generate(
        self,
        prompt: str,
        variations: int = 1,
        resolution: str = "1024*1024",
        style: str = "photorealistic",
        negative_prompt: Optional[str] = None,
        seed: Optional[int] = None,
    ) -> List[dict]:
        """Generate images from text prompt."""
        
        payload = {
            "model": self.model,
            "input": {
                "prompt": prompt[:2000],  # Max 2000 chars
            },
            "parameters": {
                "n": min(variations, 4),  # Max 4 images
                "size": resolution,
                "watermark": False,
            },
        }
        
        if negative_prompt:
            payload["parameters"]["negative_prompt"] = negative_prompt[:500]
        
        if seed:
            payload["parameters"]["seed"] = seed
        
        # Create async task
        result = await self.dashscope.create_task(self.endpoint, payload)
        task_id = result["output"]["task_id"]
        
        # Poll for completion
        final_result = await self.dashscope.poll_until_complete(
            task_id, 
            self.task_endpoint
        )
        
        if final_result["output"]["task_status"] != "SUCCEEDED":
            raise Exception(f"Generation failed: {final_result.get('output', {}).get('message', 'Unknown error')}")
        
        # Extract image URLs
        images = []
        for img_result in final_result["output"].get("results", []):
            if "url" in img_result:
                images.append({
                    "image_url": img_result["url"],
                    "resolution": resolution,
                    "seed": img_result.get("seed"),
                })
        
        return images


class WanTextToVideoService:
    """Text to Video generation using Wanxiang Wan."""
    
    def __init__(self):
        self.dashscope = DashScopeService()
        self.model = settings.wan_t2v_model
        self.endpoint = "/api/v1/services/aigc/video-generation/video-synthesis"
    
    async def generate(
        self,
        prompt: str,
        duration: int = 10,
        resolution: str = "1280*720",
        negative_prompt: Optional[str] = None,
        seed: Optional[int] = None,
    ) -> dict:
        """Generate video from text prompt."""
        
        payload = {
            "model": self.model,
            "input": {
                "prompt": prompt[:1500],  # Max 1500 chars
            },
            "parameters": {
                "size": resolution,
                "duration": duration,
                "watermark": False,
            },
        }
        
        if negative_prompt:
            payload["input"]["negative_prompt"] = negative_prompt[:500]
        
        if seed:
            payload["parameters"]["seed"] = seed
        
        # Create async task
        result = await self.dashscope.create_task(self.endpoint, payload)
        task_id = result["output"]["task_id"]
        
        # Poll for completion (videos take longer)
        final_result = await self.dashscope.poll_until_complete(
            task_id, 
            self.endpoint.replace("video-synthesis", "tasks"),
            poll_interval=10,  # Poll every 10 seconds
            max_attempts=180   # Max 30 minutes
        )
        
        if final_result["output"]["task_status"] != "SUCCEEDED":
            raise Exception(f"Generation failed: {final_result.get('output', {}).get('message', 'Unknown error')}")
        
        output = final_result["output"]
        return {
            "video_url": output.get("video_url"),
            "duration": duration,
            "resolution": resolution,
            "thumbnail_url": output.get("cover_url"),
        }


class WanImageToVideoService:
    """Image to Video generation using Wanxiang Wan."""
    
    def __init__(self):
        self.dashscope = DashScopeService()
        self.model = settings.wan_i2v_model
        self.endpoint = "/api/v1/services/aigc/image2video/image2video-synthesis"
    
    async def generate(
        self,
        image_url: str,
        motion_prompt: str,
        duration: int = 5,
        resolution: str = "1280*720",
        negative_prompt: Optional[str] = None,
        seed: Optional[int] = None,
    ) -> dict:
        """Generate video from image."""
        
        payload = {
            "model": self.model,
            "input": {
                "image_url": image_url,
                "prompt": motion_prompt[:1000],
            },
            "parameters": {
                "size": resolution,
                "duration": duration,
                "watermark": False,
            },
        }
        
        if negative_prompt:
            payload["input"]["negative_prompt"] = negative_prompt[:500]
        
        if seed:
            payload["parameters"]["seed"] = seed
        
        # Create async task
        result = await self.dashscope.create_task(self.endpoint, payload)
        task_id = result["output"]["task_id"]
        
        # Poll for completion
        final_result = await self.dashscope.poll_until_complete(
            task_id, 
            self.endpoint.replace("image2video-synthesis", "tasks"),
            poll_interval=10,
            max_attempts=180
        )
        
        if final_result["output"]["task_status"] != "SUCCEEDED":
            raise Exception(f"Generation failed: {final_result.get('output', {}).get('message', 'Unknown error')}")
        
        output = final_result["output"]
        return {
            "video_url": output.get("video_url"),
            "duration": duration,
            "resolution": resolution,
            "thumbnail_url": output.get("cover_url"),
        }


class QwenTextService:
    """Text generation using Qwen models."""
    
    def __init__(self):
        self.dashscope = DashScopeService()
        self.model = settings.qwen_text_model
        self.endpoint = "/api/v1/services/aigc/text-generation/generation"
    
    async def generate(
        self,
        prompt: str,
        template: str = "default",
        tone: str = "professional",
        max_tokens: int = 8192,
        temperature: float = 0.7,
    ) -> str:
        """Generate text from prompt."""
        
        # Build system prompt based on template and tone
        system_prompt = self._build_system_prompt(template, tone)
        
        payload = {
            "model": self.model,
            "input": {
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt[:30000]},  # Qwen supports long context
                ]
            },
            "parameters": {
                "result_format": "message",
                "max_tokens": max_tokens,
                "temperature": temperature,
                "top_p": 0.8,
            },
        }
        
        # Call API (synchronous for text generation)
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.dashscope.base_url}{self.endpoint}",
                headers=self.dashscope.headers,
                json=payload,
            )
            response.raise_for_status()
            result = response.json()
        
        # Extract generated text
        choices = result.get("output", {}).get("choices", [])
        if choices:
            return choices[0]["message"]["content"]
        
        return ""
    
    def _build_system_prompt(self, template: str, tone: str) -> str:
        """Build system prompt based on template and tone."""
        
        templates = {
            "video_script": "You are an expert video script writer for social media content.",
            "social_caption": "You are a social media copywriter specializing in engaging captions.",
            "ad_copy": "You are a persuasive advertising copywriter.",
            "blog_post": "You are an experienced blog writer with SEO expertise.",
        }
        
        tones = {
            "professional": "Write in a professional, authoritative tone.",
            "casual": "Write in a casual, friendly, conversational tone.",
            "funny": "Write in a humorous, entertaining, witty tone.",
            "persuasive": "Write in a persuasive, compelling, action-oriented tone.",
        }
        
        system = templates.get(template, templates["video_script"])
        tone_instruction = tones.get(tone, tones["professional"])
        
        return f"{system} {tone_instruction} Write in the language appropriate to the input."


# Service instances
qwen_image_service = QwenImageService()
wan_t2v_service = WanTextToVideoService()
wan_i2v_service = WanImageToVideoService()
qwen_text_service = QwenTextService()
