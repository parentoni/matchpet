#!/bin/bash

# install dependencies
sudo amazon-linux-extras install epel -y
sudo yum update -y
sudo yum install epel-release -y
sudo yum install certbot-nginx -y
sudo yum install unzip curl -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# pull docker images
aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 936580475072.dkr.ecr.sa-east-1.amazonaws.com;
docker pull 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-api:latest
docker pull 936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-nginx:latest

# start network 
docker network create -d bridge matchpet-internal-network 

# Obtain a real certificate if not exists using certbot in standalone mode.
if [ ! -f /etc/letsencrypt/live/api.matchpet.org/fullchain.pem ]; then
  sudo certbot certonly --standalone --non-interactive --agree-tos \
    --email parentoni.arthur@gmail.com \
    -d api.matchpet.org
fi

# start nginx container using the custom nginx image with preloaded config
docker run -itd -p 80:80 -p 443:443 \
  --network=matchpet-internal-network \
  --restart always \
  --name nginx \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-nginx:latest

# start API container
docker run -itd -p 8000:8000 \
  --network=matchpet-internal-network \
  --restart always \
  --name matchpet-api \
  936580475072.dkr.ecr.sa-east-1.amazonaws.com/matchpet-api:latest

# Setup a cron job to renew certificates twice a day and reload the nginx container if renewed.
sudo bash -c 'echo "0 0,12 * * * root certbot renew --quiet --deploy-hook '\''docker exec nginx nginx -s reload'\''" > /etc/cron.d/certbot-renew'
sudo chmod 644 /etc/cron.d/certbot-renew

echo "[CONFIG]: Configured instance with Certbot auto-renewal."