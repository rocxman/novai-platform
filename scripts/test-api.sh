#!/bin/bash
# NOVA AI - Quick Test Script
# Tests the generation service with your API key

set -e

echo "=================================="
echo "🚀 NOVA AI - Quick Test"
echo "=================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found, creating...${NC}"
    cp .env.example .env
fi

# Check if API key is set
if grep -q "sk-923407d300a844e08ed633a1be452b64" .env; then
    echo -e "${GREEN}✅ API Key configured${NC}"
else
    echo -e "${YELLOW}⚠️  API Key not found in .env${NC}"
fi

# Install Python dependencies
echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
cd apps/generation-service
pip install -q dashscope httpx pydantic-settings

# Run test script
echo -e "${YELLOW}🧪 Running API tests...${NC}"
python test_dashscope.py

echo -e "${GREEN}✅ Tests complete!${NC}"
