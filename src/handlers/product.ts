import { HandlerParent } from './handlerParent';
import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

export default class ProductHandler extends HandlerParent<Product, ProductStore> {
 
  constructor() {
    super(ProductStore);
  }

  // custom create
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
        return await this.store.create({
          name: req.body.name,
          price: req.body.price,
          category: req.body.category ?? ''
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle create: ${error}`);
    }
  }

  //Custom edit 
  override async edit(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
        return await this.store.edit({
          id: parseInt(req.params.id),
          name: req.body.name,
          price: req.body.price,
          category: req.body.category ?? ''
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}