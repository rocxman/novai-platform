"""Google Gemini text generation service."""

import asyncio
from typing import Optional, AsyncIterator
from google import genai
from google.genai.types import HarmCategory, HarmBlockThreshold

from .config import settings


class GeminiService:
    """Service for generating text using Google Gemini."""
    
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.google_ai_api_key,
        )
        self.model = settings.gemini_model
        
        # Safety settings
        self.safety_settings = {
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        }
    
    async def generate(
        self,
        prompt: str,
        template: str = "default",
        tone: str = "professional",
        max_tokens: int = 8192,
        temperature: float = 0.7,
    ) -> str:
        """Generate text from prompt."""
        
        # Build system prompt based on template
        system_prompt = self._build_system_prompt(template, tone)
        
        # TODO: Implement actual Gemini API call
        
        await asyncio.sleep(1)  # Simulate processing
        
        return "Generated text result"
    
    async def generate_stream(
        self,
        prompt: str,
        template: str = "default",
        tone: str = "professional",
    ) -> AsyncIterator[str]:
        """Generate text with streaming."""
        
        # TODO: Implement streaming generation
        
        yield "Streaming "
        yield "text "
        yield "result"
    
    def _build_system_prompt(self, template: str, tone: str) -> str:
        """Build system prompt based on template and tone."""
        
        templates = {
            "video_script": "You are an expert video script writer.",
            "social_caption": "You are a social media copywriter.",
            "ad_copy": "You are a persuasive advertising copywriter.",
            "blog_post": "You are an experienced blog writer.",
        }
        
        tones = {
            "professional": "Write in a professional tone.",
            "casual": "Write in a casual, friendly tone.",
            "funny": "Write in a humorous, entertaining tone.",
            "persuasive": "Write in a persuasive, compelling tone.",
        }
        
        system = templates.get(template, templates["video_script"])
        tone_instruction = tones.get(tone, tones["professional"])
        
        return f"{system} {tone_instruction}"


gemini_service = GeminiService()
