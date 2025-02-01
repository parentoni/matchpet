resource "aws_instance" "backend" {
  ami           = "ami-02358d44dc96b8fdb"
  key_name      = "AWS_MATCHPET"
  instance_type = "t2.small"
  tags = {
    Name = "matchpet-backend"
  }

  subnet_id = aws_subnet.az1-public.id
  vpc_security_group_ids = [aws_security_group.security-group.id]
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

data "aws_eip" "instance-ip" {
  public_ip = "18.229.43.175"
}

resource "aws_eip_association" "matchpet-instance-eip" {
  instance_id =  aws_instance.backend.id
  allocation_id = data.aws_eip.instance-ip.id
}