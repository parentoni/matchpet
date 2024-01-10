#!/bin/bash

# Build the react app
npm run --prefix ../public/app build --silent
echo "[DEPLOY_FRONTEND] Success building react."

aws s3 sync ../public/app/build s3://webapp-matchpet --profile "matchpet-hosting-s3-uploader"
echo "[DEPLOY_FRONTEND] Success copying files to S3 bucket"
