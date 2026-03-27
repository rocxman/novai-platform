# Memorystore Redis instance
resource "google_redis_instance" "novai_redis" {
  name                           = "novai-redis"
  tier                           = var.redis_tier
  memory_size_gb                 = 4
  region                         = var.region
  authorized_network             = google_compute_network.novai_vpc.id
  connect_mode                   = "DIRECT_PEERING"
  display_name                   = "NOVA AI Redis"
  redis_version                  = "REDIS_7_0"
  read_replicas_enabled          = true
  replica_count                  = 1
  transit_encryption_mode        = "SERVER_AUTHENTICATION"
  auth_enabled                   = true
  
  maintenance_policy {
    weekly_maintenance_window {
      day = "SUNDAY"
      start_time {
        hours   = 3
        minutes = 0
        seconds = 0
        nanos   = 0
      }
    }
  }

  redis_configs = {
    maxmemory-policy = "volatile-lru"
    timeout          = "300"
  }
}

# Store Redis auth string in Secret Manager
resource "google_secret_manager_secret" "redis_auth" {
  secret_id = "novai-redis-auth"

  replication {
    auto {}
  }
}
