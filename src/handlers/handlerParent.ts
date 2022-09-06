import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ModelParentBase } from './../models/modelParentBase';

//abstract class HandlerParent extended ModelParentBas class but that it can never be instantiated (turned into an object).
export abstract class HandlerParent<ModelType, ModelStoreType extends ModelParentBase<ModelType>> {
    protected store: ModelStoreType;

   // new operator..>> create an instance of a user-defined object type  
   constructor(type: { new(): ModelStoreType; }) {
      this.store = new type();
    }

    //methon ..>>handleRequest and Higher-order function ..>>storeHandler
    protected async handleRequest(useJWT: boolean, req: Request, res: Response, 
      storeHandler: (req: Request) => Promise<ModelType|ModelType[]|null>): Promise<void> {
      try {
        const result: string = await storeHandler(req) as unknown as string;
        if (useJWT) {
          res.json(jwt.sign(result, process.env.TOKEN_SECRET as unknown as string));
        } else {
          res.json(result);
        }
      }
      catch (error) {
        res.status(400);
        res.json(error);
      }
    }

    
    async index(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (): Promise<ModelType[]> => {
          return await this.store.index();
        });
      }
      catch (error) {
        throw new Error(`Could not handle index: ${error}`);
      }
    }

    
    async show(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (req: Request): Promise<ModelType|ModelType[]> => {
          return await this.store.show(req.params.id);
        });
      }
      catch (error) {
        throw new Error(`Could not handle show: ${error}`);
      }
    }

    
    abstract create(req: Request, res: Response): Promise<void>;

    abstract edit(req: Request, res: Response): Promise<void>;

  
    async delete(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (req: Request): Promise<ModelType> => {
          return await this.store.delete(req.params.id);
        });
      }
      catch (error) {
        throw new Error(`Could not handle delete: ${error}`);
      }
    }
}