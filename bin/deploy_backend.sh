#!/bin/bash

source ./.config/backend.env
aws ecr get-login-password --profile matchpet-ecr-agent --region sa-east-1 | docker login --username AWS --password-stdin $ECR

echo "[DEPLOY_BACKEND] Success authenticating ecr agent."


cd ..
pwd || echo

docker buildx build --target production --platform linux/amd64 --push -t 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-api:latest ./backend/matchpet-api 
docker buildx build --target production --platform linux/amd64 --push -t 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-rendering-server:latest ./backend/matchpet-rendering-server  

#docker-compose -f ../backend/docker-compose-prod.yaml build
#docker-compose -f ../backend/docker-compose-prod.yaml push 

