# Resource Access Management (RAM)
resource "alicloud_ram_user" "novai_user" {
  name         = "novai-application"
  display_name = "NOVA AI Application User"
  mobile       = "86-13800000000"
  email        = "novai@example.com"
  comments     = "Service account for NOVA AI Platform"
}

resource "alicloud_ram_access_key" "novai_key" {
  user_name = alicloud_ram_user.novai_user.name
  status    = "Active"
}

# RAM Policies
resource "alicloud_ram_policy" "novai_policy" {
  policy_name     = "NovaiApplicationPolicy"
  policy_type     = "Custom"
  description     = "Policy for NOVA AI Platform"
  document = jsonencode({
    Version = "1"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "oss:*",
          "rds:*",
          "redis:*",
          "cs:*",
          "slb:*",
          "vpc:*",
          "ecs:*",
        ]
        Resource = "*"
      }
    ]
  })
}

resource "alicloud_ram_attachment" "novai_attach" {
  user_name   = alicloud_ram_user.novai_user.name
  policy_arns = [alicloud_ram_policy.novai_policy.arn]
}

# DashScope API Access (via RAM)
resource "alicloud_ram_policy" "dashscope_policy" {
  policy_name = "NovaiDashScopeAccess"
  policy_type = "Custom"
  description = "Access to DashScope AI services"
  document = jsonencode({
    Version = "1"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "dashscope:*",
          "bailian:*"
        ]
        Resource = "*"
      }
    ]
  })
}
