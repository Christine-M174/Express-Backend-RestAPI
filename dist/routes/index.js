"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagee_1 = __importDefault(require("./api/imagee"));
//import logger from './../utilities/utils';
//import validate from './../utilities/utils';
//import utils from './../utilities/utils';
//import students from './api/image';
const routes = express_1.default.Router();
// routes.get('/', (req, res) => {
//     res.send('api routes');
//    });
// routes.use('/students',students);
routes.use('/api/image', imagee_1.default);
routes.get('/', (request, response) => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('api image');
});
exports.default = routes;
