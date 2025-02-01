#!/bin/bash

# Build the react app
npm run --prefix ../public/app build --silent
echo "[DEPLOY_FRONTEND] Success building react."

# sync s3 bucket
aws s3 sync ../public/app/build s3://webapp-matchpet --profile "matchpet-hosting-s3-uploader"
echo "[DEPLOY_FRONTEND] Success copying files to S3 bucket"

#invalidate previous cloud front files
aws cloudfront --profile "matchpet-cloudfront-agent" create-invalidation --distribution-id E1U0QTXQKXFJYT --paths '/*' 
echo "[DEPLOY_FRONTEND] Success creating invalidation job"
