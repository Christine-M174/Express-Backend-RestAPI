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
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000; // Default port
app.use(index_1.default);
//Set your application to listen on your port and output a message to the console with app.listen
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    //await manageImage.createThumbPath();
    const url = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
    console.log(`Please open ${url} to review the project ...`);
}));
exports.default = app;
//console.log("hello", "world");
//"prettier": "prettier --config .prettierrc \"src/**/*.js\" --write",
// const myFunc = (num: number): number => {
//     return num * num;
//   };
//   export default myFunc;
//Import express into index.ts
//import {promises as fsPromises}from 'fs';
//Create your application object with express()
// const inputFile = './users.csv';
// const outputFile= 'users.jeson'
//Add an API endpoint to get a route, then send a response to the browser
// app.get('/api', (req, res) => {
//   res.send('Hello, world!');
//  });
//  app.get('/countries',logger,(req,res) => {
//     res.send('countries');
//    });
//    app.get('/continents',logger,(req,res) => {
//     res.send('continents');
//    });
//    app.get('/oceans',logger,(req,res) => {
//     res.send('oceans');
//    });
