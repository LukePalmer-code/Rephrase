terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Local state for now (fine for a solo dev project). If this ever needs to
  # be shared with teammates or CI, switch to an S3 backend here.
}

variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "eu-west-2"
}

provider "aws" {
  region = var.aws_region
}

module "cognito" {
  source = "../../modules/cognito"

  user_pool_name = "rephrase-dev"
}

output "cognito_user_pool_id" {
  value = module.cognito.user_pool_id
}

output "cognito_app_client_id" {
  value = module.cognito.user_pool_client_id
}

output "aws_region" {
  value = var.aws_region
}
