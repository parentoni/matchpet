resource "aws_lb" "matchpet-api-lb" {
  name = "matchpet-production-lb"
  internal = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.security-group.id] //todo: what should be the desired sec group?
  subnets = [aws_subnet.az1-public.id, aws_subnet.az2-public.id]
}


resource "aws_lb_target_group" "matchpet-api-lb-target" {
  name        = "ecs-target-group"
  port        = 8000
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/app/status"
  }
}

resource "aws_lb_listener" "matchpet-api-lb-listener" {
  load_balancer_arn = aws_lb.matchpet-api-lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.matchpet-api-lb-target.arn
  }
}

resource "aws_lb_listener" "internal_alb_https" {
  load_balancer_arn = aws_lb.matchpet-api-lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = "arn:aws:acm:sa-east-1:936580475072:certificate/9df79691-b4e8-4467-b7e5-a915734ac269"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.matchpet-api-lb-target.arn
  }
}

resource "aws_lb_target_group_attachment" "backend-ec2-atttachment" {
  target_group_arn = aws_lb_target_group.matchpet-api-lb-target.arn
  target_id        = aws_instance.backend.id
  port             = 8000
}
