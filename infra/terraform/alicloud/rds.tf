# ApsaraDB RDS for PostgreSQL
resource "alicloud_db_instance" "novai_rds" {
  engine               = "PostgreSQL"
  engine_version       = "15.0"
  instance_type        = var.rds_instance_type
  instance_storage     = 100
  instance_charge_type = "Postpaid"
  zone_id              = "${var.region}a"
  vswitch_id           = alicloud_vswitch.novai_vswitch[0].id
  db_instance_name     = "novai-postgres"
  security_ips         = ["0.0.0.0/0"]  # Restrict in production
  
  backup_retention_period = 7
  backup_time            = "02:00Z-03:00Z"
}

# Database
resource "alicloud_db_database" "novai_main" {
  instance_id = alicloud_db_instance.novai_rds.id
  name        = "novai_main"
  charset     = "UTF8"
}

# Database Account
resource "alicloud_db_account" "novai_account" {
  instance_id = alicloud_db_instance.novai_rds.id
  name        = "novai_user"
  password    = random_password.db_password.result
  type        = "Normal"
}

resource "random_password" "db_password" {
  length  = 32
  special = true
}

# Grant privileges
resource "alicloud_db_account_privilege" "novai_privilege" {
  instance_id = alicloud_db_instance.novai_rds.id
  account_name = alicloud_db_account.novai_account.name
  db_name     = alicloud_db_database.novai_main.name
  account_privilege = "ReadWrite"
}
