# ApsaraDB for Redis (Tair)
resource "alicloud_kvstore_instance" "novai_redis" {
  instance_type        = var.redis_instance_type
  engine_version       = "7.0"
  instance_capacity    = 4
  zone_id              = "${var.region}a"
  vswitch_id           = alicloud_vswitch.novai_vswitch[0].id
  instance_charge_type = "Postpaid"
  connection_mode        = "proxy"
  
  backup_time     = "03:00Z-04:00Z"
  backup_period   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  maintain_start_time = "02:00Z"
  maintain_end_time   = "06:00Z"
}

# Set password
resource "alicloud_kvstore_account" "novai_redis" {
  instance_id = alicloud_kvstore_instance.novai_redis.id
  name        = "novai"
  password    = random_password.redis_password.result
  type        = "Standard"
}

resource "random_password" "redis_password" {
  length  = 32
  special = true
}
