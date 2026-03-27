# NOVA AI Platform - Alibaba Cloud Quick Start

## Prerequisites

1. **Alibaba Cloud Account**
   - Sign up at [alibabacloud.com](https://www.alibabacloud.com)
   - Complete account verification
   - Add payment method

2. **DashScope API Access**
   - Visit [DashScope Console](https://dashscope.console.aliyun.com/apiKey)
   - Create API Key
   - Note: Singapore region recommended for SEA users

## Setup Steps

### 1. Clone Repository
```bash
git clone https://github.com/rocxman/novai-platform.git
cd novai-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add:
- `DASHSCOPE_API_KEY` - From DashScope Console
- `DATABASE_URL` - Will be populated after Terraform
- `REDIS_URL` - Will be populated after Terraform

### 4. Deploy Infrastructure (Alibaba Cloud)
```bash
cd infra/terraform/alicloud

# Initialize Terraform
terraform init

# Create terraform.tfvars
cat > terraform.tfvars << EOF
access_key = "YOUR_ACCESS_KEY"
secret_key = "YOUR_SECRET_KEY"
region     = "ap-southeast-1"
EOF

# Plan infrastructure
terraform plan

# Apply infrastructure
terraform apply
```

### 5. Update Environment Variables
Copy outputs from Terraform to `.env`:
```bash
# Database
DATABASE_URL=postgresql://novai_user:PASSWORD@HOST:5432/novai_main

# Redis
REDIS_URL=redis://HOST:6379

# OSS
OSS_BUCKET_NAME=novai-assets
OSS_ENDPOINT=oss-ap-southeast-1.aliyuncs.com
```

### 6. Run Development
```bash
# From project root
npm run dev
```

Access:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080
- Generation Service: http://localhost:8000

## AI Models Available

| Feature | Model | Endpoint |
|---------|-------|----------|
| Text to Image | qwen-image-2.0-pro | `/generate/image` |
| Text to Video | wan2.6-t2v | `/generate/video` |
| Image to Video | wan2.1-i2v | `/generate/image-to-video` |
| Text Generation | qwen-max | `/generate/text` |

## Pricing (DashScope)

| Model | Price (USD) |
|-------|-------------|
| qwen-image-2.0-pro | ~$0.04/image |
| wan2.6-t2v | ~$0.50/video |
| wan2.1-i2v | ~$0.40/video |
| qwen-max | ~$0.004/1K tokens |

## Troubleshooting

### DashScope API Error
- Check API key is valid
- Verify region matches API key region
- Check API quota/billing

### Infrastructure Issues
- Ensure RAM user has required permissions
- Check VPC/security group rules
- Verify RDS/Redis are accessible

## Next Steps

1. **Customize Models** - Edit `apps/generation-service/src/config.py`
2. **Add Payment** - Configure Midtrans/Alipay
3. **Deploy to ACK** - Use Kubernetes manifests
4. **Setup Monitoring** - Configure Alibaba Cloud Monitoring

## Documentation

- [DashScope API Docs](https://help.aliyun.com/zh/dashscope/)
- [Alibaba Cloud Docs](https://www.alibabacloud.com/help)
- [Terraform Provider](https://registry.terraform.io/providers/aliyun/alicloud/latest/docs)
