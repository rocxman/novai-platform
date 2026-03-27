# Virtual Private Cloud
resource "alicloud_vpc" "novai_vpc" {
  vpc_name   = "novai-vpc"
  cidr_block = var.vpc_cidr
}

# VSwitches (3 for HA across zones)
resource "alicloud_vswitch" "novai_vswitch" {
  count      = 3
  vswitch_name = "novai-vswitch-${count.index + 1}"
  vpc_id       = alicloud_vpc.novai_vpc.id
  cidr_block   = cidrsubnet(var.vpc_cidr, 8, count.index)
  zone_id      = "${var.region}${count.index + 1 == 1 ? "a" : count.index + 1 == 2 ? "b" : "c"}"
}

# NAT Gateway
resource "alicloud_nat_gateway" "novai_nat" {
  name        = "novai-nat-gateway"
  vpc_id      = alicloud_vpc.novai_vpc.id
  payment_type = "PayAsYouGo"
}

# SNAT Entry for internet access
resource "alicloud_snat_entry" "novai_snat" {
  snat_table_id = alicloud_nat_gateway.novai_nat.snat_table_ids[0]
  vswitch_id    = alicloud_vswitch.novai_vswitch[0].id
  snat_ip       = alicloud_nat_gateway.novai_nat.nat_ip
}

# Security Group
resource "alicloud_security_group" "novai_sg" {
  name   = "novai-security-group"
  vpc_id = alicloud_vpc.novai_vpc.id
}

resource "alicloud_security_group_rule" "allow_http" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "80/80"
  security_group_id = alicloud_security_group.novai_sg.id
  cidr_ip           = "0.0.0.0/0"
}

resource "alicloud_security_group_rule" "allow_https" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "443/443"
  security_group_id = alicloud_security_group.novai_sg.id
  cidr_ip           = "0.0.0.0/0"
}

resource "alicloud_security_group_rule" "allow_internal" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "0/65535"
  security_group_id = alicloud_security_group.novai_sg.id
  cidr_ip           = var.vpc_cidr
}
