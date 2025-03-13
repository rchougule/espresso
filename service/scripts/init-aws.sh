#!/bin/sh

: '
This script is used to sync templates to the S3 bucket.
'

# Create the S3 bucket if it doesn't exist
awslocal --region="$AWS_DEFAULT_REGION" --endpoint="$AWS_S3_ENDPOINT" s3api create-bucket --bucket "$AWS_S3_BUCKET_NAME" --create-bucket-configuration LocationConstraint="$AWS_DEFAULT_REGION"

# Upload each template file individually to maintain the correct structure
for template in /templates/*.html; do
  filename=$(basename "$template")
  awslocal --region="$AWS_DEFAULT_REGION" --endpoint="$AWS_S3_ENDPOINT" s3 cp "$template" "s3://$AWS_S3_BUCKET_NAME/$filename"
done
# upload from inputPDFs to s3
for file in /inputPDFs/*; do
  filename=$(basename "$file")
  awslocal --region="$AWS_DEFAULT_REGION" --endpoint="$AWS_S3_ENDPOINT" s3 cp "$file" "s3://$AWS_S3_BUCKET_NAME/$filename"
done


echo "Templates have been uploaded to the S3 bucket."

# List the contents of the bucket to verify
echo "Contents of S3 bucket:"
awslocal --region="$AWS_DEFAULT_REGION" --endpoint="$AWS_S3_ENDPOINT" s3 ls "s3://$AWS_S3_BUCKET_NAME"