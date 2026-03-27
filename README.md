# NOVA AI Platform

> AI-Powered Creative Generation Platform

**Capabilities:** Text to Video • Text to Image • Image to Video • AI Text Generation

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/rocxman/novai-platform.git
cd novai-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run development
npm run dev
```

## 📦 Project Structure

```
novai-platform/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   ├── api-gateway/            # Node.js Fastify API Gateway
│   └── generation-service/     # Python FastAPI AI orchestration
├── packages/
│   ├── ui/                     # Shared React components
│   ├── types/                  # Shared TypeScript types
│   └── config/                 # Shared ESLint, TypeScript configs
├── infra/
│   ├── terraform/              # Infrastructure as Code (GCP)
│   ├── kubernetes/             # Kubernetes manifests
│   └── helm/                   # Helm charts
├── docs/                       # Documentation
└── scripts/                    # Build/deploy scripts
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand + React Query
- **Animation:** Framer Motion

### Backend
- **API Gateway:** Node.js 20 + Fastify
- **AI Service:** Python 3.11 + FastAPI
- **Database:** PostgreSQL 15 (Cloud SQL)
- **Cache:** Redis 7 (Memorystore)
- **Queue:** BullMQ

### Infrastructure
- **Cloud:** Google Cloud Platform (GCP)
- **Orchestration:** GKE (Kubernetes)
- **CI/CD:** GitHub Actions + ArgoCD
- **AI:** Google AI Studio (Veo 2, Imagen 3, Gemini)

## 📚 Documentation

- [Full SDLC Documentation](./docs/DOCUMENT.md)
- [Execution Timeline](./docs/TIMELINE.md)
- [API Documentation](./apps/api-gateway/README.md)
- [Deployment Guide](./infra/README.md)

## 🏃 Development

```bash
# Run all apps in development
npm run dev

# Run specific app
npm run dev --filter=web
npm run dev --filter=api-gateway

# Build all
npm run build

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint
```

## 🚢 Deployment

```bash
# Build Docker images
npm run docker:build

# Push to registry
npm run docker:push

# Deploy to Kubernetes
npm run k8s:deploy
```

## 📋 Environment Variables

See `.env.example` for required environment variables.

## 📄 License

Proprietary - All rights reserved.

---

**NOVA AI Platform** • Powered by Google AI Studio
