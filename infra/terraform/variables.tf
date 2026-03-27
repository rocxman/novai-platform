variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "asia-southeast1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "gke_cluster_name" {
  description = "GKE Cluster name"
  type        = string
  default     = "novai-cluster"
}

variable "database_tier" {
  description = "Cloud SQL tier"
  type        = string
  default     = "db-custom-2-4096"
}

variable "redis_tier" {
  description = "Redis instance tier"
  type        = string
  default     = "REDIS_STANDARD_4GB"
}

variable "node_pool_min_count" {
  description = "Minimum node count"
  type        = number
  default     = 2
}

variable "node_pool_max_count" {
  description = "Maximum node count"
  type        = number
  default     = 10
}
