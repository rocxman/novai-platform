# Cloud SQL PostgreSQL instance
resource "google_sql_database_instance" "novai_db" {
  name                = "novai-database"
  database_version    = "POSTGRES_15"
  region              = var.region
  deletion_protection = false

  settings {
    tier              = var.database_tier
    availability_type = "REGIONAL"

    backup_configuration {
      enabled                        = true
      start_time                     = "02:00"
      point_in_time_recovery_enabled = true
      transaction_log_retention_days = 7
    }

    ip_configuration {
      ipv4_enabled    = true
      private_network = google_compute_network.novai_vpc.id
      require_ssl     = true
    }

    insights_config {
      query_insights_enabled = true
    }

    user_labels = {
      environment = var.environment
      application = "novai"
    }
  }

  depends_on = [google_service_account.novai_database]
}

# Database
resource "google_sql_database" "novai_main" {
  name     = "novai_main"
  instance = google_sql_database_instance.novai_db.name
}

# Database user
resource "google_sql_user" "novai_user" {
  name     = "novai_user"
  instance = google_sql_database_instance.novai_db.name
  password = random_password.db_password.result
}

# Random password
resource "random_password" "db_password" {
  length  = 32
  special = true
}

# Store password in Secret Manager
resource "google_secret_manager_secret" "db_password" {
  secret_id = "novai-db-password"

  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "db_password" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.db_password.result
}
