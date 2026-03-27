# ============================================
# NOVA AI Platform - Terraform Infrastructure
# ============================================
# Alibaba Cloud Infrastructure Configuration
# ============================================

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    alicloud = {
      source  = "aliyun/alicloud"
      version = "~> 1.220.0"
    }
  }

  backend "oss" {
    bucket = "novai-terraform-state"
    prefix = "terraform/state"
  }
}

# Configure Alibaba Cloud provider
provider "alicloud" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}
