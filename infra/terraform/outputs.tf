# Outputs
output "gke_cluster_name" {
  description = "GKE Cluster name"
  value       = google_container_cluster.novai_cluster.name
}

output "gke_cluster_endpoint" {
  description = "GKE Cluster endpoint"
  value       = google_container_cluster.novai_cluster.endpoint
  sensitive   = true
}

output "database_connection_name" {
  description = "Cloud SQL connection name"
  value       = google_sql_database_instance.novai_db.connection_name
}

output "database_ip" {
  description = "Cloud SQL private IP"
  value       = google_sql_database_instance.novai_db.private_ip_address
}

output "redis_host" {
  description = "Redis host"
  value       = google_redis_instance.novai_redis.host
}

output "redis_port" {
  description = "Redis port"
  value       = google_redis_instance.novai_redis.port
}

output "gcs_bucket_name" {
  description = "GCS bucket name"
  value       = google_storage_bucket.novai_assets.name
}

output "load_balancer_ip" {
  description = "Load balancer IP"
  value       = google_compute_global_address.novai_ip.address
}

output "service_account_emails" {
  description = "Service account emails"
  value = {
    compute  = google_service_account.novai_compute.email
    storage  = google_service_account.novai_storage.email
    database = google_service_account.novai_database.email
  }
}
