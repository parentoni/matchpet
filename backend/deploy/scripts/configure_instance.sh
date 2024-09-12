#!/bin/bash

# install dependencies
sudo yum update -y
sudo yum install unzip curl -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# pull docker
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936580475072.dkr.ecr.sa-east-1.amazonaws.com;
docker pull 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-api:latest
docker pull 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-rendering-server:latest

# start network 
docker network create -d bridge matchpet-internal-network 

# docker start
docker run -itd -p 8000:8000 --network=matchpet-internal-network --restart always --name matchpet-api 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-api
docker run -itd --network=matchpet-internal-network --name matchpet-rendering-server --restart always 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-rendering-server
