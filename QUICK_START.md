# 🚀 NOVA AI - Quick Start Guide

**API Key Configured:** ✅ `sk-923407d300a844e08ed633a1be452b64`

---

## ⚡ QUICK START (5 Minutes)

### Option 1: Run Test Script (Recommended)

```bash
# Clone repository
git clone https://github.com/rocxman/novai-platform.git
cd novai-platform

# Run test script
chmod +x scripts/test-api.sh
./scripts/test-api.sh
```

This will:
1. ✅ Verify API key is valid
2. ✅ Test text generation (Qwen-Max)
3. ✅ Test text to image (Qwen-Image-2.0-Pro)
4. ✅ Test text to video (Wan2.6-T2V)

---

### Option 2: Manual Testing

#### Step 1: Install Dependencies

```bash
cd apps/generation-service
pip install dashscope httpx pydantic-settings
```

#### Step 2: Run Test Script

```bash
python test_dashscope.py
```

#### Step 3: Start Generation Service

```bash
# From apps/generation-service
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Access Swagger UI: **http://localhost:8000/docs**

---

## 🧪 TEST EACH MODEL MANUALLY

### 1. Text Generation (Qwen-Max)

```bash
curl -X POST https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation \
  -H "Authorization: Bearer sk-923407d300a844e08ed633a1be452b64" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-max",
    "input": {
      "messages": [
        {"role": "user", "content": "Write a haiku about AI"}
      ]
    }
  }'
```

### 2. Text to Image (Qwen-Image-2.0-Pro)

```bash
curl -X POST https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis \
  -H "Authorization: Bearer sk-923407d300a844e08ed633a1be452b64" \
  -H "Content-Type: application/json" \
  -H "X-DashScope-Async: enable" \
  -d '{
    "model": "qwen-image-2.0-pro",
    "input": {
      "prompt": "A cute cat playing with a ball, photorealistic"
    },
    "parameters": {
      "n": 1,
      "size": "1024*1024"
    }
  }'
```

### 3. Text to Video (Wan2.6-T2V)

```bash
curl -X POST https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis \
  -H "Authorization: Bearer sk-923407d300a844e08ed633a1be452b64" \
  -H "Content-Type: application/json" \
  -H "X-DashScope-Async: enable" \
  -d '{
    "model": "wan2.6-t2v",
    "input": {
      "prompt": "A cat walking in the garden, realistic"
    },
    "parameters": {
      "size": "1280*720",
      "duration": 5
    }
  }'
```

---

## 📊 EXPECTED RESULTS

### ✅ Success Response (Text Generation)
```json
{
  "output": {
    "choices": [{
      "message": {
        "content": "Digital dreams awake,\nSilent circuits think and create,\nFuture now unfolds."
      }
    }]
  },
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20
  }
}
```

### ✅ Success Response (Image)
```json
{
  "output": {
    "task_status": "SUCCEEDED",
    "results": [{
      "url": "https://dashscope-result.oss-cn-shanghai.aliyuncs.com/xxx.png"
    }]
  }
}
```

### ✅ Success Response (Video)
```json
{
  "output": {
    "task_status": "SUCCEEDED",
    "video_url": "https://dashscope-result.oss-cn-shanghai.aliyuncs.com/xxx.mp4"
  }
}
```

---

## 🔒 SECURITY REMINDERS

1. ⚠️ **NEVER commit .env file to Git**
2. ⚠️ **NEVER share API key publicly**
3. ✅ API key is already in `.gitignore`
4. ✅ Consider rotating API key after testing

### To Rotate API Key:
1. Go to [DashScope Console](https://dashscope.console.aliyun.com/apiKey)
2. Delete old key
3. Create new key
4. Update `.env` file

---

## 📁 PROJECT STRUCTURE

```
novai-platform/
├── .env                        # ⚠️ YOUR API KEY (DO NOT COMMIT)
├── .env.example                # Template (safe to share)
├── apps/
│   └── generation-service/
│       ├── src/
│       │   ├── config.py       # Configuration with API key
│       │   └── main.py         # FastAPI application
│       └── test_dashscope.py   # Test script
└── scripts/
    └── test-api.sh             # Bash test runner
```

---

## 🐛 TROUBLESHOOTING

### Error: "InvalidApiKey"
- Check API key is correct: `sk-923407d300a844e08ed633a1be452b64`
- Ensure no extra spaces in .env
- Verify region is `singapore`

### Error: "Insufficient Balance"
- Check account balance in [DashScope Console](https://dashscope.console.aliyun.com)
- Add funds to account

### Error: "Timeout"
- Image/Video generation takes time (1-5 minutes)
- Test script has built-in retry logic
- Check internet connection

---

## 📞 NEXT STEPS

After testing succeeds:

1. **Start Development**
   ```bash
   npm install
   npm run dev
   ```

2. **Deploy Infrastructure** (Optional)
   ```bash
   cd infra/terraform/alicloud
   terraform init
   terraform apply
   ```

3. **Customize Models** - Edit `apps/generation-service/src/config.py`

4. **Build Frontend** - Access at http://localhost:3000

---

## 📚 DOCUMENTATION

- [DashScope API Docs](https://help.aliyun.com/zh/dashscope/)
- [Model Pricing](https://help.aliyun.com/zh/model-studio/pricing)
- [Alibaba Cloud Setup](./docs/ALIBABA_CLOUD_SETUP.md)

---

**🎉 Ready to create with AI!**
