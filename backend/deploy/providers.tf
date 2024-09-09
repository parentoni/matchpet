terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

  backend "s3" {
    bucket  = "matchpet-terraform"
    region  = "sa-east-1"
    key     = "state/terraform.tfstate"
  }
}

provider "aws" {
  access_key= var.access_key
  secret_key= var.secret_key
  region  = var.region
}

