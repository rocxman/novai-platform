# Object Storage Service (OSS)
resource "alicloud_oss_bucket" "novai_assets" {
  bucket = "novai-assets-${var.environment}"
  
  versioning {
    status = "Enabled"
  }
  
  lifecycle_rule {
    id      = "expire-old-files"
    prefix  = "temp/"
    enabled = true
    
    expiration {
      days = 30
    }
  }
  
  server_side_encryption_rule {
    sse_algorithm = "AES256"
  }
}

# OSS Bucket Policy (Public Read for CDN)
resource "alicloud_oss_bucket_policy" "novai_policy" {
  bucket = alicloud_oss_bucket.novai_assets.name
  policy = jsonencode({
    Version = "1"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = ["oss:GetObject"]
        Resource  = ["acs:oss:*:*:${alicloud_oss_bucket.novai_assets.name}/*"]
      }
    ]
  })
}

# OSS CORS Configuration
resource "alicloud_oss_bucket_cors" "novai_cors" {
  bucket = alicloud_oss_bucket.novai_assets.name
  
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}
