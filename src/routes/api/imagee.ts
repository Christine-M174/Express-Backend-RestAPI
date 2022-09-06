import express from 'express';
import manageImage from './../../manageImage';
//import utils from './../../utilities/utils';
//import validate from './../../utilities/utils';

///////////////////////////////////////////////////////////////////////////////////

interface Queries {
  filename?: string;
  height?: string;
  width?: string;
}

const validate = async (query: Queries): Promise<null | string> => {
  // Check if requested file is available
  if (!(await manageImage.isImageExist(query.filename))) {
    const availableImageNames: string = (
      await manageImage.getImageName()
    ).join(', ');
    return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) {
    return null; // No size values
  }

  // Check for valid width value
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  // Check for valid height value
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }

  return null;
};

 
// Middleware
const imagee: express.Router = express.Router();

imagee.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    // Create thumb if not yet available
    if (!(await manageImage.isThumbExist(request.query))) {
      error = await manageImage.createThumb(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // Retrieve appropriate image path and display image
    const path: null | string = await manageImage.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened :-D What did you do?');
    }
  }
);

export default imagee;




// const image = express.Router();

// image.get(
//   '/', utils.logger,
//   async (
//     request: express.Request,
//     response: express.Response
//   ): Promise<void> => {
//     // Check the request can be worked
//     const validationMessage: null | string = await validate.validate(
//       request.query
//     );
//     if (validationMessage) {
//       response.send(validationMessage);
//       return;
//     }
//     let error: null | string = '';

    // Create thumb if not yet exist
    // if (!(await manageImage.isThumbExist(request.query))) {
    //   error = await manageImage.createThumb(request.query);
    // }
    // // Handle error
    // if (error) {
    //   response.send(error);
    //   return;
    // }
    // Retrieve image path and display image
  //   const path: null | string = await manageImage.getImagePath(request.query);
  //   if (path) {
  //     response.sendFile(path);
  //   } else {
  //     response.send('there is a wrong');
  //   }
  // }
//);
/////////////////////////////////////////////////////////////////////////////
//export default image;

// const students = express.Router();
// students.get('/', (req, res) => {
//     res.send('students routes');
//    });
//    export default students ;
