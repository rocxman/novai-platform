# NOVA AI Platform
## AI-Powered Creative Generation Platform

**Capabilities:** Text to Video • Text to Image • Image to Video • AI Text Generation

---

## 🚀 QUICK START

**API Key Already Configured!** ✅

```bash
# Clone and test
git clone https://github.com/rocxman/novai-platform.git
cd novai-platform
./scripts/test-api.sh
```

See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

---

## 📦 WHAT'S INCLUDED

### AI Models (Alibaba Cloud DashScope)
| Model | Purpose | Status |
|-------|---------|--------|
| **Qwen-Image-2.0-Pro** | Text to Image | ✅ Configured |
| **Wan2.6-T2V** | Text to Video | ✅ Configured |
| **Wan2.1-I2V** | Image to Video | ✅ Configured |
| **Qwen-Max** | Text Generation | ✅ Configured |

### Infrastructure
- ✅ Generation Service (Python FastAPI)
- ✅ API Gateway (Node.js Fastify)
- ✅ Frontend (Next.js 14)
- ✅ Terraform (Alibaba Cloud)
- ✅ Kubernetes Manifests

---

## 🛠️ TECH STACK

**Frontend:** Next.js 14 • TypeScript • Tailwind CSS • shadcn/ui

**Backend:** Node.js 20 • Fastify • Python 3.11 • FastAPI

**AI:** Alibaba Cloud DashScope (Qwen • Wanxiang Wan)

**Infrastructure:** Alibaba Cloud • ACK • RDS • OSS • SLB

---

## 📁 PROJECT STRUCTURE

```
novai-platform/
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── api-gateway/            # Node.js API
│   └── generation-service/     # Python AI service
├── packages/
│   ├── types/                  # Shared types
│   └── ui/                     # Shared components
├── infra/
│   └── terraform/alicloud/     # Alibaba Cloud IaC
├── docs/                       # Documentation
└── scripts/                    # Test/deploy scripts
```

---

## 🧪 TESTING

### Run All Tests
```bash
./scripts/test-api.sh
```

### Test Individual Models
```bash
cd apps/generation-service
python test_dashscope.py
```

### Interactive API Docs
```bash
# Start service
python -m uvicorn src.main:app --reload

# Open browser
http://localhost:8000/docs
```

---

## 📚 DOCUMENTATION

| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | Get started in 5 minutes |
| [docs/ALIBABA_CLOUD_SETUP.md](./docs/ALIBABA_CLOUD_SETUP.md) | Full Alibaba Cloud setup |
| [docs/DOCUMENT.md](./docs/DOCUMENT.md) | SDLC documentation |
| [docs/TIMELINE.md](./docs/TIMELINE.md) | Project timeline |

---

## 🔒 SECURITY

⚠️ **IMPORTANT:**
- `.env` file contains API key - **DO NOT COMMIT**
- API key is excluded from Git via `.gitignore`
- Rotate API key if exposed: [DashScope Console](https://dashscope.console.aliyun.com/apiKey)

---

## 💰 PRICING

| Model | Price (USD) | Free Tier |
|-------|-------------|-----------|
| Text to Image | ~$0.04/image | 20 credits/month |
| Text to Video | ~$0.50/video | Included |
| Image to Video | ~$0.40/video | Included |
| Text Generation | ~$0.004/1K tokens | Included |

---

## 🤝 CONTRIBUTING

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 SUPPORT

- **Issues:** [GitHub Issues](https://github.com/rocxman/novai-platform/issues)
- **Email:** support@novaai.id
- **Docs:** [Documentation](./docs/)

---

## 📄 LICENSE

Proprietary - All rights reserved.

---

**NOVA AI Platform** • Powered by Alibaba Cloud DashScope

**© 2025 NOVA AI. All rights reserved.**
