//resource "mongodbatlas_project" "aws_atlas" {
//  name   = "matchpet-production"
//  org_id = var.atlas_org_id
//}
//
//resource "mongodbatlas_advanced_cluster" "cluster-atlas" {
//  project_id   = mongodbatlas_project.aws_atlas.id
//  name         = "matchpet-production-main"
//  cluster_type = "REPLICASET"
//
//  replication_specs {
//    region_configs {
//      electable_specs {
//        instance_size = "M10"
//        node_count    = 3
//      }
//
//      provider_name = "AWS"
//      priority      = 7
//      region_name   = var.atlas_region
//    }
//  }
//
//  backup_enabled = true
//  termination_protection_enabled = true
//
//}
//
//resource "mongodbatlas_database_user" "db-user" {
//  username           = var.atlas_db_user
//  password           = var.atlas_db_password
//  auth_database_name = "admin"
//  project_id         = mongodbatlas_project.aws_atlas.id
//  roles {
//    role_name     = "readWriteAnyDatabase"
//    database_name = "admin"
//  }
//
//  depends_on = [mongodbatlas_project.aws_atlas]
//}
//
//resource "mongodbatlas_network_container" "atlas_container" {
//  project_id       = mongodbatlas_project.aws_atlas.id
//  atlas_cidr_block = var.atlas_cidr_block
//  provider_name    = "AWS"
//  region_name      = var.atlas_region
//}
//
//data "mongodbatlas_network_container" "atlas_container" {
//  container_id = mongodbatlas_network_container.atlas_container.container_id
//  project_id   = mongodbatlas_project.aws_atlas.id
//}
//
//resource "mongodbatlas_network_peering" "aws-atlas" {
//  accepter_region_name   = var.region
//  project_id             = mongodbatlas_project.aws_atlas.id
//  container_id           = mongodbatlas_network_container.atlas_container.container_id
//  provider_name          = "AWS"
//  route_table_cidr_block = aws_vpc.main.cidr_block
//  vpc_id                 = aws_vpc.main.id
//  aws_account_id         = var.aws_account_id
//}
//
//resource "mongodbatlas_project_ip_access_list" "aws_access" {
//  project_id = mongodbatlas_project.aws_atlas.id
//  cidr_block = aws_vpc.main.cidr_block
//  comment    = "cidr block for AWS VPC."
//}
//
