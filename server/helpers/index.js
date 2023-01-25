import { upload, getFileStream } from '../s3';
import logger from '../logger';

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

export const encode = (data) => {
  try {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64;
  } catch (err) {
    logger.error(err);
  }
};

export const convertBufferToImage = (imageObj) => {
  try {
    return encode(imageObj.Body);
  } catch (err) {
    logger.error(err);
  }
};

export const downloadImage = async (array) => {
  try {
    let result, convertedImg;
    const projectsArr = array;
    let convertedImgArr = [];
    for (let i = 0; i < projectsArr.length; i++) {
      console.log('running', ' ', i);
      if (Array.isArray(projectsArr[i].projectDetails.images)) {
        for (let j = 0; j < projectsArr[i].projectDetails.images.length; j++) {
          result = await getFileStream(
            projectsArr[i].projectDetails.images[i].key
          );
          convertedImg = convertBufferToImage(result);
          convertedImgArr.push(convertedImg);
        }
      } else {
        result = await getFileStream(projectsArr[i].projectDetails.images.key);
        convertedImg = convertBufferToImage(result);
        convertedImgArr.push(convertedImg);
      }
      projectsArr[i].projectDetails.images = convertedImgArr;
      convertedImgArr = [];
    }
    return projectsArr;
  } catch (err) {
    logger.error(err);
  }
};
