terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "user_pool_name" {
  description = "Name of the Cognito User Pool."
  type        = string
}

variable "app_client_name" {
  description = "Name of the Cognito App Client (used by the frontend)."
  type        = string
  default     = "web-client"
}

resource "aws_cognito_user_pool" "this" {
  name = var.user_pool_name

  # Sign in with email instead of a separate username.
  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # Anyone can sign themselves up (this is a single-user learning project,
  # but we're not locking signup down to admin-only).
  admin_create_user_config {
    allow_admin_create_user_only = false
  }
}

resource "aws_cognito_user_pool_client" "web" {
  name         = var.app_client_name
  user_pool_id = aws_cognito_user_pool.this.id

  # No client secret: this client is used directly from the browser (a SPA
  # can't keep a secret safe), so Cognito issues tokens without one.
  generate_secret = false

  # USER_PASSWORD_AUTH: lets the frontend (or a test script) log in with a
  # plain email+password call, no Hosted UI redirect needed.
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
  ]

  access_token_validity  = 60   # minutes
  id_token_validity      = 60   # minutes
  refresh_token_validity = 30   # days

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }
}

output "user_pool_id" {
  value = aws_cognito_user_pool.this.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.web.id
}

output "user_pool_arn" {
  value = aws_cognito_user_pool.this.arn
}
