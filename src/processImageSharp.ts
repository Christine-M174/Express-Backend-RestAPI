import sharp from 'sharp';
//import {promises as fsPromises}from 'fs';

interface ImgResizeParameters {
  imageInputPath: string;
  imageOutputPath: string;
  width: number;
  height: number;
}

const processImage = async (
  paramters: ImgResizeParameters
): Promise<null | string> => {
  try {
    await sharp(paramters.imageInputPath)
      .resize(paramters.width, paramters.height)
      .toFormat('jpg')
      .toFile(paramters.imageOutputPath);
    return null;
  } catch {
    return 'Image could not be processed.';
  }
};

export default processImage;
