import S3 from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
import fs from 'fs';
import { logger } from './logger';

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_ACCESS_KEY_SECRET;

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretKey,
});

export const upload = (file) => {
  const fileStream = fs.createReadStream(file.filepath);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.originalFilename.split('.')[0],
  };

  return s3.upload(uploadParams).promise();
};

export const getFileStream = (fileKey) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };

    return s3.getObject(downloadParams).promise();
  } catch (err) {
    logger.error(err);
  }
};
