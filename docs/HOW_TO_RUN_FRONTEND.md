# 🚀 HOW TO RUN THE FRONTEND

**Status:** ✅ Code Complete - Ready to Run

---

## ⚠️ SYSTEM REQUIREMENTS

- **Node.js:** v20.0.0 or higher
- **RAM:** Minimum 4GB (8GB recommended)
- **Disk:** 1GB free space

---

## 📋 STEP-BY-STEP GUIDE

### Option 1: Development Mode (Recommended for Testing)

```bash
# 1. Navigate to web app
cd /home/wildibyrug/novai-platform/apps/web

# 2. Install dependencies (if not done)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Homepage: http://localhost:3000
# Dashboard: http://localhost:3000/dashboard
# Text to Image: http://localhost:3000/generate/image
# Text to Video: http://localhost:3000/generate/video
# Text Generator: http://localhost:3000/generate/text
```

### Option 2: Production Build

```bash
# 1. Navigate to web app
cd /home/wildibyrug/novai-platform/apps/web

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Start production server
npm run start

# 5. Open browser
# http://localhost:3000
```

---

## 🔧 TROUBLESHOOTING

### Error: SIGBUS or Memory Issues

If you see `SIGBUS` error during build:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

Or use a machine with more RAM (8GB+ recommended).

### Error: Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Error: Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ PAGES AVAILABLE

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Landing page with features |
| Dashboard | `/dashboard` | Main dashboard with all features |
| Text to Image | `/generate/image` | Generate images from text |
| Text to Video | `/generate/video` | Generate videos from text |
| Text Generator | `/generate/text` | AI text generation |

---

## 🎯 TESTING CHECKLIST

### Before Testing
- [ ] Generation service running on port 8000
- [ ] Frontend running on port 3000
- [ ] No console errors in browser

### Test Each Feature
- [ ] Navigate to dashboard
- [ ] Click "Text to Image"
- [ ] Enter prompt and generate
- [ ] Download generated image
- [ ] Test "Text to Video"
- [ ] Test "AI Text Generator"

---

## 🌐 ENVIRONMENT VARIABLES

Create `.env.local` in `apps/web` directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production:

```bash
NEXT_PUBLIC_API_URL=https://api.novaai.id
NEXT_PUBLIC_APP_URL=https://novaai.id
```

---

## 📸 SCREENSHOTS FOR DOCUMENTATION

Once running, capture these pages:

1. **Homepage** - `/`
2. **Dashboard** - `/dashboard`
3. **Text to Image** - `/generate/image` (before & after generation)
4. **Text to Video** - `/generate/video` (with video player)
5. **Text Generator** - `/generate/text` (with result)

Use browser DevTools or:
```bash
# Using Playwright (if installed)
npx playwright screenshot http://localhost:3000 homepage.png
```

---

## 🚀 DEPLOYMENT

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to web app
cd apps/web

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

---

## 📞 SUPPORT

If you encounter issues:

1. Check Node.js version: `node --version`
2. Check npm version: `npm --version`
3. Clear cache: `npm cache clean --force`
4. Reinstall: `rm -rf node_modules && npm install`

---

**© 2025 NOVA AI Platform**
