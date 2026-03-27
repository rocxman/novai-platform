# GKE Cluster
resource "google_container_cluster" "novai_cluster" {
  name     = var.gke_cluster_name
  location = var.region

  # Autopilot mode
  enable_autopilot = true

  network    = google_compute_network.novai_vpc.name
  subnetwork = google_compute_subnetwork.novai_subnet[0].name

  # Private cluster config
  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }

  # IP allocation policy
  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  # Network policy
  network_policy {
    enabled  = true
    provider = "CALICO"
  }

  # Release channel
  release_channel {
    channel = "REGULAR"
  }

  # Workload identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Addons
  addons_config {
    http_load_balancing {
      disabled = false
    }
    horizontal_pod_autoscaling {
      disabled = false
    }
    network_policy_config {
      disabled = false
    }
    gcp_filestore_csi_driver_config {
      enabled = true
    }
  }

  # Logging and monitoring
  logging_config {
    enable_components = [
      "SYSTEM_COMPONENTS",
      "WORKLOADS",
    ]
  }

  monitoring_config {
    enable_components = [
      "SYSTEM_COMPONENTS",
    ]
    managed_prometheus {
      enabled = true
    }
  }

  # Timeouts
  timeouts {
    create = "30m"
    update = "30m"
  }
}

# Node pool (for autopilot, this is managed automatically)
resource "google_container_node_pool" "primary" {
  name       = "default-pool"
  location   = var.region
  cluster    = google_container_cluster.novai_cluster.name
  node_count = var.node_pool_min_count

  autoscaling {
    min_node_count = var.node_pool_min_count
    max_node_count = var.node_pool_max_count
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }
}
