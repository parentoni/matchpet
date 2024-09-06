resource "aws_iam_policy" "matchpet-ec2-ecr-policy" {
  name        = "matchpet-ec2-ecr-policy"
  path        = "/"
  description = "Allows access to ecr from ec2"
  policy = jsonencode({

    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:GetRepositoryPolicy",
        "ecr:DescribeRepositories",
        "ecr:ListImages",
        "ecr:DescribeImages",
        "ecr:BatchGetImage",
        "ecr:GetAuthorizationToken"
      ],
      Resource = "*"
      }
    ]

  })

}

resource "aws_iam_role" "matchpet-ec2-role" {
  name = "matchpet-ec2-assume-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}
