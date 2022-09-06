import { HandlerParent } from './handlerParent';
import { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

export default class OrderHandler extends HandlerParent<Order, OrderStore> {


  constructor() {
    super(OrderStore);
  }

  // Custom show
  override async show(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order[]> => {
        return await this.store.show(req.params.user_id);
      });
    }
    catch (error) {
      throw new Error(`Could not handle show: ${error}`);
    }
  }

 //Custom create
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
        return await this.store.create({
          user_id: req.body.user_id,
          status: req.body.status ?? 'active'
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
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
        return await this.store.edit({
          id: parseInt(req.params.id),
          user_id: req.body.user_id,
          status: req.body.status ?? 'active'
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}