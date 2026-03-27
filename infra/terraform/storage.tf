# GCS Buckets
resource "google_storage_bucket" "novai_assets" {
  name          = "${var.project_id}-assets"
  location      = "ASIA-SOUTHEAST1"
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["Content-Type", "Authorization"]
    max_age_seconds = 3600
  }

  encryption {
    default_kms_key_name = google_kms_crypto_key.gcs_key.id
  }
}

# CDN for GCS
resource "google_compute_backend_bucket" "novai_cdn" {
  name        = "novai-assets-cdn"
  bucket_name = google_storage_bucket.novai_assets.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    client_ttl        = 86400
    default_ttl       = 3600
    max_ttl           = 86400
    negative_caching  = true
    serve_while_stale = 86400
  }
}

# KMS key for GCS encryption
resource "google_kms_key_ring" "novai_keyring" {
  name     = "novai-keyring"
  location = var.region
}

resource "google_kms_crypto_key" "gcs_key" {
  name            = "gcs-encryption-key"
  key_ring        = google_kms_key_ring.novai_keyring.id
  rotation_period = "7776000s" # 90 days
}

# Bucket IAM
resource "google_storage_bucket_iam_member" "novai_storage_access" {
  bucket = google_storage_bucket.novai_assets.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.novai_storage.email}"
}
