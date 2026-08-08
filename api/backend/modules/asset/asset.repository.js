import { ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '../../config/s3.js';

export const listAssets = async () => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME
  });
  return await s3Client.send(command);
};

export const uploadAsset = async (fileName, fileBuffer, mimeType) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType
  });
  return await s3Client.send(command);
};

export const deleteAsset = async (fileName) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName
  });
  return await s3Client.send(command);
};
