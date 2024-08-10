#!/bin/bash

source ./.config/backend.env
aws ecr get-login-password --profile matchpet-ecr-agent --region sa-east-1 | docker login --username AWS --password-stdin $ECR

echo "[DEPLOY_BACKEND] Success authenticating ecr agent."

docker-compose -f ../backend/docker-compose-prod.yaml build
docker-compose -f ../backend/docker-compose-prod.yaml push 

