#!/bin/bash

cd app && npm install --silent
npm run start-production --sillent
npx pm2 status

echo "[START_EXPRESS]: Started Express server."