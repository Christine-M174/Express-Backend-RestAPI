import processImage from './processImageSharp';
import { promises as fs } from 'fs';
import path from 'path';

class Queries {
  filename?: string;
  width?: string;
  height?: string;
}

class manageImage {
  static imagesFullPath = path.resolve(__dirname, './images/thumb');
  static imagesThumbPath = path.resolve(__dirname, './images/thumb');

  static async getImagePath(paramters: Queries): Promise<null | string> {
    if (!paramters.filename) {
      return null;
    }

    // Build path
    const filePath: string =
      paramters.width && paramters.height
        ? path.resolve(
            manageImage.imagesThumbPath,
            `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`
          )
        : path.resolve(manageImage.imagesFullPath, `${paramters.filename}.jpg`);

    // Check file existence
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  // Check if an image is exist
  static async isImageExist(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }

    return (await manageImage.getImageName()).includes(filename);
  }

  static async getImageName(): Promise<string[]> {
    try {
      return (await fs.readdir(manageImage.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0] // Cut extension
      );
    } catch {
      return [];
    }
  }

  static async isThumbExist(paramters: Queries): Promise<boolean> {
    if (!paramters.filename || !paramters.width || !paramters.height) {
      return false; // Fail early
    }
    const filePath: string = path.resolve(
      manageImage.imagesThumbPath,
      `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  //Create thumb path.
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(manageImage.imagesThumbPath);
      // Path already exist
    } catch {
      fs.mkdir(manageImage.imagesThumbPath);
      //fs.mkdir('./images/thumb/sports.jpg', {recursive: true})
    }
  }

  //Create thumb file.
  static async createThumb(paramters: Queries): Promise<null | string> {
    if (!paramters.filename || !paramters.width || !paramters.height) {
      return null;
    }

    const filePathFull: string = path.resolve(
      manageImage.imagesFullPath,
      `${paramters.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      manageImage.imagesThumbPath,
      `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    // Resize original image and store as thumb
    return await processImage({
      imageInputPath: filePathFull,
      imageOutputPath: filePathThumb,
      width: parseInt(paramters.width),
      height: parseInt(paramters.height),
    });
  }
}

export default manageImage;
