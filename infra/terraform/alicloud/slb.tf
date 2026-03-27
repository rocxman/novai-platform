# Server Load Balancer (SLB)
resource "alicloud_slb_load_balancer" "novai_slb" {
  load_balancer_name   = "novai-slb"
  load_balancer_spec   = "slb.s2.small"
  internet_charge_type = "paybytraffic"
  internet_max_bandwidth = 100
  vswitch_id           = alicloud_vswitch.novai_vswitch[0].id
  address_type         = "internet"
}

# SSL Certificate
resource "alicloud_slb_server_certificate" "novai_ssl" {
  load_balancer_id    = alicloud_slb_load_balancer.novai_slb.id
  server_certificate_name = "novai-ssl-cert"
  private_key         = file("ssl/novai.key")
  server_certificate  = file("ssl/novai.crt")
}

# HTTPS Listener
resource "alicloud_slb_listener" "novai_https" {
  load_balancer_id    = alicloud_slb_load_balancer.novai_slb.id
  backend_port        = 80
  frontend_port       = 443
  protocol            = "https"
  bandwidth           = 100
  server_certificate_id = alicloud_slb_server_certificate.novai_ssl.id
  
  health_check        = "on"
  health_check_type   = "http"
  health_check_uri    = "/health"
}

# HTTP to HTTPS Redirect
resource "alicloud_slb_listener" "novai_http" {
  load_balancer_id = alicloud_slb_load_balancer.novai_slb.id
  backend_port     = 80
  frontend_port    = 80
  protocol         = "http"
  bandwidth        = 100
  
  redirect        = "https"
  redirect_port   = 443
}
