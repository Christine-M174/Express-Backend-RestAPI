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
const processImageSharp_1 = __importDefault(require("./processImageSharp"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class Queries {
}
class manageImage {
    static getImagePath(paramters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!paramters.filename) {
                return null;
            }
            // Build path
            const filePath = paramters.width && paramters.height
                ? path_1.default.resolve(manageImage.imagesThumbPath, `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`)
                : path_1.default.resolve(manageImage.imagesFullPath, `${paramters.filename}.jpg`);
            // Check file existence
            try {
                yield fs_1.promises.access(filePath);
                return filePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    // Check if an image is exist
    static isImageExist(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false;
            }
            return (yield manageImage.getImageName()).includes(filename);
        });
    }
    static getImageName() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(manageImage.imagesFullPath)).map((filename) => filename.split('.')[0] // Cut extension
                );
            }
            catch (_a) {
                return [];
            }
        });
    }
    static isThumbExist(paramters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!paramters.filename || !paramters.width || !paramters.height) {
                return false; // Fail early
            }
            const filePath = path_1.default.resolve(manageImage.imagesThumbPath, `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    //Create thumb path.
    // static async createThumbPath(): Promise<void> {
    //   try {
    //     await fs.access(manageImage.imagesThumbPath);
    //     // Path already exist
    //   } catch {
    //     fs.mkdir(manageImage.imagesThumbPath);
    //     //fs.mkdir('./images/thumb/sports.jpg', {recursive: true})
    //   }
    // }
    //Create thumb file.
    static createThumb(paramters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!paramters.filename || !paramters.width || !paramters.height) {
                return null;
            }
            const filePathFull = path_1.default.resolve(manageImage.imagesFullPath, `${paramters.filename}.jpg`);
            const filePathThumb = path_1.default.resolve(manageImage.imagesThumbPath, `${paramters.filename}-${paramters.width}x${paramters.height}.jpg`);
            console.log(`Creating thumb ${filePathThumb}`);
            // Resize original image and store as thumb
            return yield (0, processImageSharp_1.default)({
                imageInputPath: filePathFull,
                imageOutputPath: filePathThumb,
                width: parseInt(paramters.width),
                height: parseInt(paramters.height),
            });
        });
    }
}
manageImage.imagesFullPath = path_1.default.resolve(__dirname, './images/thumb');
manageImage.imagesThumbPath = path_1.default.resolve(__dirname, './images/thumb');
exports.default = manageImage;
