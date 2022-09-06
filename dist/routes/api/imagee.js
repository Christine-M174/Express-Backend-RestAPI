"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manageImage_1 = __importDefault(require("./../../manageImage"));
const validate = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if requested file is available
    if (!(yield manageImage_1.default.isImageExist(query.filename))) {
        const availableImageNames = (yield manageImage_1.default.getImageName()).join(', ');
        return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
    }
    if (!query.width && !query.height) {
        return null; // No size values
    }
    // Check for valid width value
    const width = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
        return "Please provide a positive numerical value for the 'width' query segment.";
    }
    // Check for valid height value
    const height = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
        return "Please provide a positive numerical value for the 'height' query segment.";
    }
    return null;
});
// Middleware
const imagee = express_1.default.Router();
imagee.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Check whether request can be worked with
    const validationMessage = yield validate(request.query);
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }
    let error = '';
    // Create thumb if not yet available
    if (!(yield manageImage_1.default.isThumbExist(request.query))) {
        error = yield manageImage_1.default.createThumb(request.query);
    }
    // Handle image processing error
    if (error) {
        response.send(error);
        return;
    }
    // Retrieve appropriate image path and display image
    const path = yield manageImage_1.default.getImagePath(request.query);
    if (path) {
        response.sendFile(path);
    }
    else {
        response.send('This should not have happened :-D What did you do?');
    }
}));
exports.default = imagee;
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
