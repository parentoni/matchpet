resource "aws_instance" "backend" {
  ami           = "ami-02358d44dc96b8fdb"
  key_name      = "AWS_MATCHPET"
  subnet_id     = aws_subnet.az1-public.id
  instance_type = "t2.micro"
  tags = {
    Name = "matchpet-backend"
  }
  security_groups = [aws_security_group.security-group.id]

  iam_instance_profile = aws_iam_instance_profile.backend-iam-profile.name
  user_data = filebase64("${path.module}/scripts/configure_instance.sh")
}

resource "aws_iam_role_policy_attachment" "backned-policy" {
  role = aws_iam_role.matchpet-ec2-role.name
  policy_arn = aws_iam_policy.matchpet-ec2-ecr-policy.arn
}

resource "aws_iam_instance_profile" "backend-iam-profile" {
  name = "backend-iam-profile"
  role = aws_iam_role.matchpet-ec2-role.name
}

