
// Main vpc, ensures dns is supported and custom hostnames
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "matchpet-production-vpc"
  }

}

// Internet gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name : "matchpet-production-vpc-internet-gateway"
  }
}


// SUBNETS 
resource "aws_subnet" "az1-private" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = var.aws_az1
  map_public_ip_on_launch = true
  tags = {
    Name = "matchpet-production-az1-private"
  }
}

resource "aws_subnet" "az1-public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = var.aws_az1
  map_public_ip_on_launch = true
  tags = {
    Name = "matchpet-production-az1-public"
  }
}

resource "aws_subnet" "az2-private" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = var.aws_az2
  map_public_ip_on_launch = true
  tags = {
    Name = "matchpet-production-az2-private"
  }
}

resource "aws_subnet" "az2-public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = var.aws_az2
  map_public_ip_on_launch = true
  tags = {
    Name = "matchpet-production-az2-public"
  }
}

// Route tables
resource "aws_route_table" "internet" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "matchpet-production-vpc-internet-table"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "matchpet-production-vpc-private-table"
  }
}

// route table associations
resource "aws_route_table_association" "az1-public" {
  route_table_id = aws_route_table.internet.id
  subnet_id      = aws_subnet.az1-public.id
}

resource "aws_route_table_association" "az2-public" {
  route_table_id = aws_route_table.internet.id
  subnet_id      = aws_subnet.az2-public.id
}

resource "aws_route_table_association" "az1-private" {
  route_table_id = aws_route_table.private.id
  subnet_id      = aws_subnet.az1-private.id
}

resource "aws_route_table_association" "az2-private" {
  route_table_id = aws_route_table.private.id
  subnet_id      = aws_subnet.az2-private.id
}

// routes
resource "aws_route" "internet-access" {
  route_table_id         = aws_route_table.internet.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

// temp: ideal would be a NAT or private link to access ecr
resource "aws_route" "private-internet-access" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

//resource "aws_route" "peer-access" {
//  route_table_id = aws_route_table.private.id
//  destination_cidr_block = var.atlas_cidr_block
//  vpc_peering_connection_id = mongodbatlas_network_peering.aws-atlas.connection_id
//  depends_on = [aws_vpc_peering_connection_accepter.peer]
//}

// peering
//resource "aws_vpc_peering_connection_accepter" "peer" {
//  vpc_peering_connection_id = mongodbatlas_network_peering.aws-atlas.connection_id
//  auto_accept = true
//}

resource "aws_security_group" "security-group" {
  name   = "matchpet-production-security-group"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

