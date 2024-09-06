resource "aws_route53_record" "apiv2" {
  zone_id = var.aws_route53_zone
  name = "apiv2.matchpet.org"
  type = "A"

  alias {
    name = aws_lb.matchpet-api-lb.dns_name
    zone_id = aws_lb.matchpet-api-lb.zone_id
    evaluate_target_health = true
  }
}
