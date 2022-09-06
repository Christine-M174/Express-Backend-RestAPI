import express from 'express';
import imagee from './api/imagee';
//import logger from './../utilities/utils';
//import validate from './../utilities/utils';
//import utils from './../utilities/utils';
//import students from './api/image';
const routes = express.Router();

// routes.get('/', (req, res) => {
//     res.send('api routes');
//    });

// routes.use('/students',students);

routes.use('/api/image', imagee);

routes.get( 
  '/', 
  (request: express.Request, response: express.Response): void => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('api image');
  }
);

export default routes;