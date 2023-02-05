import { addProjects, getProjects } from '../query';
import S3 from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
import fs from 'fs';
import createLoggerInstance from '../logger';

dotenv.config();
const logger = createLoggerInstance();
const bucketName = process.env.AMAZON_BUCKET_NAME;
const region = process.env.AMAZON_BUCKET_REGION;
const accessKeyId = process.env.AMAZON_ACCESS_KEY;
const secretKey = process.env.AMAZON_ACCESS_KEY_SECRET;

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretKey,
});

export const upload = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.originalname.split('.')[0],
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

export const imagesUpload = async (array) => {
  try {
    const uploadedData = [];
    for (let i = 0; i < array.length; i++) {
      const result = await upload(array[i]);
      uploadedData.push(result);
    }
    return uploadedData;
  } catch (err) {
    logger.error(err);
  }
};

export const getUserProjects = async (req, res) => {
  const result = await getProjects();
  return result;
};

export const addUserProject = async (files, projectDetails) => {
  const imagesArr = [];
  let imagePathsArr;
  if (!Array.isArray(files)) {
    imagesArr.push(files);
    imagePathsArr = await imagesUpload(imagesArr);
  } else {
    imagePathsArr = await imagesUpload(files);
  }
  projectDetails.images = imagePathsArr;
  const result = await addProjects(projectDetails);
  return result;
};
