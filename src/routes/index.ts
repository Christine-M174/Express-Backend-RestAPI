import express from 'express';
import users from './api/users';
import products from './api/products';
import orders from './api/orders';
import orderProducts from './api/orderProducts';

const routes: express.Router = express.Router();

routes.use('/api/users', users);
routes.use('/api/products', products);
routes.use('/api/orders', orders);
routes.use('/api/orderProducts', orderProducts);

routes.get(
  '/',
  (req: express.Request, res: express.Response): void => {
   
    res.send(
      '<h1>Welcome</h1><p>Please check the readme for routes!</p>'
    );
  }
);

export default routes;