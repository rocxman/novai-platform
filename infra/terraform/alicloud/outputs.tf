# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = alicloud_vpc.novai_vpc.id
}

output "ack_cluster_id" {
  description = "ACK Cluster ID"
  value       = alicloud_cs_kubernetes.novai_cluster.id
}

output "ack_cluster_api_server" {
  description = "ACK Cluster API Server"
  value       = alicloud_cs_kubernetes.novai_cluster.kube_config
  sensitive   = true
}

output "rds_connection_string" {
  description = "RDS Connection String"
  value       = alicloud_db_instance.novai_rds.connection_string
}

output "rds_database" {
  description = "RDS Database Name"
  value       = alicloud_db_database.novai_main.name
}

output "redis_connection_string" {
  description = "Redis Connection String"
  value       = alicloud_kvstore_instance.novai_redis.connection_string
}

output "redis_port" {
  description = "Redis Port"
  value       = alicloud_kvstore_instance.novai_redis.port
}

output "oss_bucket_name" {
  description = "OSS Bucket Name"
  value       = alicloud_oss_bucket.novai_assets.bucket
}

output "oss_endpoint" {
  description = "OSS Endpoint"
  value       = alicloud_oss_bucket.novai_assets.oss_domain
}

output "slb_public_ip" {
  description = "SLB Public IP"
  value       = alicloud_slb_load_balancer.novai_slb.address
}

output "ram_access_key" {
  description = "RAM Access Key ID"
  value       = alicloud_ram_access_key.novai_key.access_key
  sensitive   = true
}

output "ram_secret_key" {
  description = "RAM Secret Key"
  value       = alicloud_ram_access_key.novai_key.secret
  sensitive   = true
}
