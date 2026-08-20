import os
import boto3
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger(__name__)

def get_s3_client():
    """Returns an S3 client if configured, otherwise None."""
    bucket_name = os.getenv("AWS_S3_BUCKET")
    if not bucket_name:
        return None, None
        
    endpoint_url = os.getenv("AWS_ENDPOINT_URL")
    
    s3_client = boto3.client(
        's3',
        endpoint_url=endpoint_url,
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION", "ap-northeast-1")
    )
    return s3_client, bucket_name

def generate_presigned_url(client_method: str, object_name: str, expiration=3600):
    """
    Generate a presigned URL to share an S3 object.
    client_method: 'get_object' or 'put_object'
    object_name: string
    expiration: Time in seconds for the presigned URL to remain valid
    """
    s3_client, bucket_name = get_s3_client()
    if not s3_client:
        return None
        
    try:
        response = s3_client.generate_presigned_url(
            client_method,
            Params={'Bucket': bucket_name, 'Key': object_name},
            ExpiresIn=expiration
        )
    except ClientError as e:
        logger.error(f"Error generating presigned URL: {e}")
        return None

    return response

def generate_presigned_download_url(object_name: str, expiration=3600) -> str:
    """Generate a presigned URL to download a file."""
    return generate_presigned_url('get_object', object_name, expiration)

def generate_presigned_upload_url(object_name: str, expiration=3600) -> str:
    """Generate a presigned URL to upload a file."""
    return generate_presigned_url('put_object', object_name, expiration)

def upload_file_to_s3(file_obj, object_name: str) -> bool:
    """Upload a file object directly to an S3 bucket."""
    s3_client, bucket_name = get_s3_client()
    if not s3_client:
        return False
        
    try:
        s3_client.upload_fileobj(file_obj, bucket_name, object_name)
        return True
    except ClientError as e:
        logger.error(f"Failed to upload to S3: {e}")
        return False

def delete_s3_object(object_name: str) -> bool:
    """Delete an object from an S3 bucket."""
    s3_client, bucket_name = get_s3_client()
    if not s3_client:
        return False
        
    try:
        s3_client.delete_object(Bucket=bucket_name, Key=object_name)
        return True
    except ClientError as e:
        logger.error(f"Failed to delete from S3: {e}")
        return False
