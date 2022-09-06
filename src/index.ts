import express from 'express';
import routes from './routes/index';
import manageImage from './manageImage';

const app: express.Application = express();
const port: number = 3000; // Default port

app.use(routes);
//Set your application to listen on your port and output a message to the console with app.listen
app.listen(port,  async (): Promise<void>=> {
  await manageImage.createThumbPath();
  const url: string = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});

export default app;
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
