# Cloud Load Balancer
resource "google_compute_global_address" "novai_ip" {
  name = "novai-global-ip"
}

# SSL Certificate
resource "google_compute_managed_ssl_certificate" "novai_cert" {
  name = "novai-ssl-cert"

  managed {
    domains = ["novaai.id", "*.novaai.id", "api.novaai.id"]
  }
}

# URL Map
resource "google_compute_url_map" "novai_lb" {
  name = "novai-lb"

  default_service = google_compute_backend_bucket.novai_cdn.id

  host_rule {
    hosts        = ["api.novaai.id"]
    path_matcher = "api-paths"
  }

  path_matcher {
    name            = "api-paths"
    default_service = google_compute_backend_bucket.novai_cdn.id

    path_rule {
      paths       = ["/api/*"]
      description = "API routes"
    }
  }
}

# HTTPS Proxy
resource "google_compute_target_https_proxy" "novai_https" {
  name    = "novai-https-proxy"
  url_map = google_compute_url_map.novai_lb.id
  ssl_certificates = [
    google_compute_managed_ssl_certificate.novai_cert.id
  ]
}

# Global Forwarding Rule
resource "google_compute_global_forwarding_rule" "novai_https" {
  name       = "novai-https-forwarding"
  target     = google_compute_target_https_proxy.novai_https.id
  port_range = "443"
  ip_address = google_compute_global_address.novai_ip.address
}

# Cloud Armor Security Policy
resource "google_compute_security_policy" "novai_waf" {
  name = "novai-waf"

  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-stable')"
      }
    }
    description = "XSS attack prevention"
  }

  rule {
    action   = "deny(403)"
    priority = "1001"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-stable')"
      }
    }
    description = "SQL injection prevention"
  }

  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default rule"
  }
}
