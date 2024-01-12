#!/bin/bash

source ../backend/.conf/server/.env

echo "[DEPLOY_BACKEND]: Selected Host: $HOSTNAME"

# Build backend
rm -rf ../backend/dist
npm run --silent build --prefix ../backend

echo "[DEPLOY_BACKEND]: Typescript compiled"

# Copy necessary files to instance

ssh $USER@$HOSTNAME -i $IDENTITYFILE 'rm -rf app && mkdir app'

scp  -q -i $IDENTITYFILE -r ./remote $USER@$HOSTNAME:~/. # Copy scripts
scp  -q -i $IDENTITYFILE -r ../backend/.conf/nginx $USER@$HOSTNAME:~/. # Copy scripts
scp  -q -i $IDENTITYFILE -r ../backend/dist $USER@$HOSTNAME:~/app # Copy build
scp  -q -i $IDENTITYFILE -r ../backend/static $USER@$HOSTNAME:~/app # Copy static
scp  -q -i $IDENTITYFILE -r ../backend/package*.json $USER@$HOSTNAME:~/app # Copy package*
scp  -q -i $IDENTITYFILE -r ../backend/pm2.json $USER@$HOSTNAME:~/app # Copy pm2 configs

echo "[DEPLOY_BACKEND]: Copied source code to host machine."
# todo: copy build

ssh $USER@$HOSTNAME -i $IDENTITYFILE 'sudo chmod +x ~/remote/startup.sh && ./remote/startup.sh '
