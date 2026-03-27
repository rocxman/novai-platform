variable "access_key" {
  description = "Alibaba Cloud Access Key ID"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "Alibaba Cloud Access Key Secret"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Alibaba Cloud Region"
  type        = string
  default     = "ap-southeast-1"  # Singapore
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "ack_node_count" {
  description = "ACK node pool count"
  type        = number
  default     = 3
}

variable "rds_instance_type" {
  description = "RDS instance type"
  type        = string
  default     = "pg.n2.medium.2c"
}

variable "redis_instance_type" {
  description = "Redis instance type"
  type        = string
  default     = "redis.master.small.default"
}
