terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }

    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.9"
    }
  }

  required_version = ">= 1.2.0"

  backend "s3" {
    bucket  = "matchpet-terraform"
    profile = "terraform-test"
    region  = "sa-east-1"
    key     = "state/terraform.tfstate"
  }
}

provider "aws" {
  profile = "terraform-test"
  region  = var.region
}

provider "mongodbatlas" {
  public_key  = var.atlas_public_key
  private_key = var.atlas_private_key
}

