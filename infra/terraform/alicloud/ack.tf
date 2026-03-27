# Container Service for Kubernetes (ACK)
resource "alicloud_cs_kubernetes" "novai_cluster" {
  name                         = "novai-ack-cluster"
  cluster_spec                 = "ack-pro"
  worker_vswitch_ids           = alicloud_vswitch.novai_vswitch[*].id
  load_balancer_spec           = "slb.s2.small"
  internet_charge_type         = "PayByTraffic"
  internet_max_bandwidth_out   = 100
  pod_cidr                     = "172.16.0.0/16"
  service_cidr                 = "172.17.0.0/16"
  kubernetes_version           = "1.28"
  deletion_protection          = false
  
  worker_data_disks {
    category = "cloud_efficiency"
    size     = 120
  }
  
  worker_instance_types = ["ecs.c6.large", "ecs.c6.xlarge"]
  worker_number         = var.ack_node_count
}

# Node Pool
resource "alicloud_cs_kubernetes_node_pool" "novai_pool" {
  cluster_id    = alicloud_cs_kubernetes.novai_cluster.id
  name          = "novai-node-pool"
  instance_types = ["ecs.c6.large", "ecs.c6.xlarge"]
  vswitch_ids   = alicloud_vswitch.novai_vswitch[*].id
  
  scaling_group {
    min_size = 2
    max_size = 10
    type     = "ecs"
  }
  
  auto_scaling {
    enable              = true
    max_idle_node_count = 2
  }
}
