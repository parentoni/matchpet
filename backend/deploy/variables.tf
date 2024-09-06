variable "region" {
  description = "Atlas region to locate resources"
  default     = "sa-east-1"
}

variable "aws_account_id" {
  description = "Matchpet's account id"
}

variable "aws_az1" {
  description = "AWS availability zone 1"
  default     = "sa-east-1a"
}

variable "aws_az2" {
  description = "AWS availability zone 2"
  default     = "sa-east-1c"
}

variable "aws_route53_zone" {
  description = "AWS route53 hosted zone"
}
