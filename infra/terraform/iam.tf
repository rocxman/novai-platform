# Service Account for compute resources
resource "google_service_account" "novai_compute" {
  account_id   = "novai-compute"
  display_name = "NOVA AI Compute Service Account"
}

# Service Account for storage
resource "google_service_account" "novai_storage" {
  account_id   = "novai-storage"
  display_name = "NOVA AI Storage Service Account"
}

# Service Account for database
resource "google_service_account" "novai_database" {
  account_id   = "novai-database"
  display_name = "NOVA AI Database Service Account"
}

# Grant required permissions
resource "google_project_iam_member" "compute_roles" {
  project = var.project_id
  role    = "roles/compute.instanceAdmin.v1"
  member  = "serviceAccount:${google_service_account.novai_compute.email}"
}

resource "google_project_iam_member" "storage_roles" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.novai_storage.email}"
}

resource "google_project_iam_member" "database_roles" {
  project = var.project_id
  role    = "roles/cloudsql.admin"
  member  = "serviceAccount:${google_service_account.novai_database.email}"
}

resource "google_project_iam_member" "vertex_ai" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.novai_compute.email}"
}
