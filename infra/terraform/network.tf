# VPC Network
resource "google_compute_network" "novai_vpc" {
  name                            = "novai-vpc"
  auto_create_subnetwork          = false
  delete_default_routes_on_create = false
}

# Subnets for each zone
resource "google_compute_subnetwork" "novai_subnet" {
  count         = 3
  name          = "novai-subnet-${count.index + 1}"
  ip_cidr_range = "10.0.${count.index * 64}.0/20"
  region        = var.region
  network       = google_compute_network.novai_vpc.id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.${count.index + 10}.0.0/16"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.${count.index + 20}.0.0/20"
  }
}

# Cloud NAT
resource "google_compute_router" "novai_router" {
  name    = "novai-router"
  region  = var.region
  network = google_compute_network.novai_vpc.id
}

resource "google_compute_router_nat" "novai_nat" {
  name                               = "novai-nat"
  router                             = google_compute_router.novai_router.name
  region                             = google_compute_router.novai_router.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

# Firewall rules
resource "google_compute_firewall" "allow_internal" {
  name    = "novai-allow-internal"
  network = google_compute_network.novai_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }

  source_ranges = [
    google_compute_subnetwork.novai_subnet[0].ip_cidr_range,
    google_compute_subnetwork.novai_subnet[1].ip_cidr_range,
    google_compute_subnetwork.novai_subnet[2].ip_cidr_range,
  ]
}

resource "google_compute_firewall" "allow_health_checks" {
  name    = "novai-allow-health-checks"
  network = google_compute_network.novai_vpc.name

  allow {
    protocol = "tcp"
  }

  source_ranges = ["35.191.0.0/16", "130.211.0.0/22"]
  target_tags   = ["gke-node"]
}
