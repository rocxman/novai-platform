#!/usr/bin/env python3
"""
NOVA AI - DashScope API Test Script
Tests all AI models with your API key
"""

import asyncio
import httpx
import json
from datetime import datetime

# Your API Key
API_KEY = "sk-923407d300a844e08ed633a1be452b64"
BASE_URL = "https://dashscope-intl.aliyuncs.com"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}


async def test_api_key():
    """Test if API key is valid."""
    print("\n🔑 Testing API Key...")
    print("=" * 50)
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Simple text generation to test API key
            response = await client.post(
                f"{BASE_URL}/api/v1/services/aigc/text-generation/generation",
                headers=HEADERS,
                json={
                    "model": "qwen-turbo",
                    "input": {
                        "messages": [
                            {"role": "user", "content": "Hello"}
                        ]
                    }
                }
            )
            
            if response.status_code == 200:
                print("✅ API Key is VALID")
                return True
            else:
                print(f"❌ API Key is INVALID: {response.text}")
                return False
    except Exception as e:
        print(f"❌ Error testing API key: {e}")
        return False


async def test_text_generation():
    """Test Qwen3 text generation."""
    print("\n📝 Testing Text Generation (Qwen3-Max - Flagship)...")
    print("=" * 50)
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{BASE_URL}/api/v1/services/aigc/text-generation/generation",
                headers=HEADERS,
                json={
                    "model": "qwen3-max",
                    "input": {
                        "messages": [
                            {"role": "system", "content": "You are a helpful assistant."},
                            {"role": "user", "content": "Write a short poem about AI in 2 sentences."}
                        ]
                    },
                    "parameters": {
                        "result_format": "message",
                        "max_tokens": 500
                    }
                }
            )
            
            result = response.json()
            if response.status_code == 200:
                content = result["output"]["choices"][0]["message"]["content"]
                print(f"✅ Text Generation SUCCESS")
                print(f"📄 Result: {content[:200]}...")
                return True
            else:
                print(f"❌ Text Generation FAILED: {result.get('message', 'Unknown error')}")
                return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


async def test_text_to_image():
    """Test Qwen-Image-Max text to image generation."""
    print("\n🎨 Testing Text to Image (Qwen-Image-Max - Best for Text Rendering)...")
    print("=" * 50)
    
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            # Use qwen-image-max for best quality with text rendering
            create_response = await client.post(
                f"{BASE_URL}/api/v1/services/aigc/text2image/image-synthesis",
                headers={**HEADERS, "X-DashScope-Async": "enable"},
                json={
                    "model": "qwen-image-max",
                    "input": {
                        "prompt": "A cute cat playing with a ball, photorealistic, high quality, detailed"
                    },
                    "parameters": {
                        "n": 1,
                        "size": "1024*1024",
                        "watermark": False
                    }
                }
            )
            
            create_result = create_response.json()
            if create_response.status_code != 200:
                print(f"❌ Image Generation FAILED: {create_result.get('message', 'Unknown error')}")
                return False
            
            task_id = create_result["output"]["task_id"]
            print(f"⏳ Task created: {task_id}")
            print("⏳ Waiting for generation (up to 60 seconds)...")
            
            # Poll for result
            for i in range(12):
                await asyncio.sleep(5)
                
                status_response = await client.get(
                    f"{BASE_URL}/api/v1/tasks/{task_id}",
                    headers=HEADERS
                )
                
                status_result = status_response.json()
                status = status_result["output"].get("task_status", "UNKNOWN")
                
                if status == "SUCCEEDED":
                    image_url = status_result["output"]["results"][0]["url"]
                    print(f"✅ Image Generation SUCCESS")
                    print(f"🖼️  Image URL: {image_url}")
                    print(f"⚠️  Note: URL valid for 24 hours only")
                    return True
                elif status in ["FAILED", "CANCELED"]:
                    print(f"❌ Image Generation FAILED: {status_result['output'].get('message', 'Unknown error')}")
                    return False
                else:
                    print(f"⏳ Status: {status}... ({i*5}s)")
            
            print("⏱️  Timeout after 60 seconds")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


async def test_text_to_video():
    """Test Wan2.6-i2v text to video generation (supports 15s ultra-long)."""
    print("\n🎬 Testing Text to Video (Wan2.6-i2v - Latest 15s Ultra-Long)...")
    print("=" * 50)
    
    try:
        async with httpx.AsyncClient(timeout=300.0) as client:
            # Use wan2.6-i2v - latest model with 15s support
            create_response = await client.post(
                f"{BASE_URL}/api/v1/services/aigc/video-generation/video-synthesis",
                headers={**HEADERS, "X-DashScope-Async": "enable"},
                json={
                    "model": "wan2.6-i2v",
                    "input": {
                        "prompt": "A cat walking in the garden, realistic, high quality, smooth motion"
                    },
                    "parameters": {
                        "size": "1280*720",
                        "duration": 5,
                        "watermark": False
                    }
                }
            )
            
            create_result = create_response.json()
            if create_response.status_code != 200:
                print(f"❌ Video Generation FAILED: {create_result.get('message', 'Unknown error')}")
                return False
            
            task_id = create_result["output"]["task_id"]
            print(f"⏳ Task created: {task_id}")
            print("⏳ Waiting for generation (up to 3 minutes)...")
            
            # Poll for result (videos take longer)
            for i in range(36):
                await asyncio.sleep(5)
                
                status_response = await client.get(
                    f"{BASE_URL}/api/v1/tasks/{task_id}",
                    headers=HEADERS
                )
                
                status_result = status_response.json()
                status = status_result["output"].get("task_status", "UNKNOWN")
                
                if status == "SUCCEEDED":
                    video_url = status_result["output"].get("video_url", "N/A")
                    print(f"✅ Video Generation SUCCESS")
                    print(f"🎬 Video URL: {video_url}")
                    print(f"⚠️  Note: URL valid for 24 hours only")
                    return True
                elif status in ["FAILED", "CANCELED"]:
                    print(f"❌ Video Generation FAILED: {status_result['output'].get('message', 'Unknown error')}")
                    return False
                else:
                    print(f"⏳ Status: {status}... ({i*5}s)")
            
            print("⏱️  Timeout after 3 minutes")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


async def main():
    """Run all tests."""
    print("\n" + "=" * 60)
    print("🚀 NOVA AI - Alibaba Cloud DashScope API Test (2026 Models)")
    print("=" * 60)
    print(f"📍 Region: Singapore (Optimized for Free Tier)")
    print(f"🔑 API Key: sk-923407d300a844e08ed633a1be452b64")
    print(f"🕐 Time: {datetime.now().isoformat()}")
    print("\n📦 Models Testing:")
    print("  • Qwen3-Max (Text Generation - Flagship)")
    print("  • Qwen-Image-Max (Text to Image - Best Quality)")
    print("  • Wan2.6-i2v (Text/Video - 15s Ultra-Long)")
    print("=" * 60)
    
    results = {
        "api_key_valid": await test_api_key(),
        "text_generation": False,
        "text_to_image": False,
        "text_to_video": False,
    }
    
    if results["api_key_valid"]:
        results["text_generation"] = await test_text_generation()
        await asyncio.sleep(2)
        results["text_to_image"] = await test_text_to_image()
        await asyncio.sleep(2)
        results["text_to_video"] = await test_text_to_video()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    for test, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} - {test.replace('_', ' ').title()}")
    
    total = sum(results.values())
    print(f"\nTotal: {total}/{len(results)} tests passed")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
