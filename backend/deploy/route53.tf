resource "aws_route53_record" "api" {
  zone_id = var.aws_route53_zone
  name = "api.matchpet.org"
  type = "A"

  records = [ aws_instance.backend.public_ip ]
  ttl = 600
}
