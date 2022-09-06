import Client from '../database';
import { QueryResult } from 'pg';

// abstract class .... table param <ModelType>...intialize class param in constructor 
export abstract class ModelParentBase<ModelType> {
    protected table: string;
  
    constructor(table: string) {
      this.table = table;
    }

    //sql ..> SQL query to run
    //params ..> query parameters
    //promise ..> fun return (query return result)
    
    protected async runQuery(sql: string, params?: (string|number|undefined)[]): Promise<QueryResult<ModelType>> {
        try {
          const conn = await Client.connect();
          let result: QueryResult<ModelType>;
          if (params) {
            result = await conn.query(sql, params);
          }
          else {
            result = await conn.query(sql);
          }
          conn.release();
    
          return result;
        }
        catch (error) {
          throw new Error(`Could not run query: ${error}`);
        }
      }
    
       
   //show me the default data exist in tables (Get default index result).
   
  async index(): Promise<ModelType[]> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(`SELECT * FROM ${this.table}`);
      return result.rows;
    }
    catch (error) {
      throw new Error(`Could not run index query on ${this.table}: ${error}`);
    }
  }
    //show me a spicific row from DB by id (Get).
    //param {string} id Id.
    //return {ModelType} (User, Order, etc.).
   
    async show(id: string): Promise<ModelType|ModelType[]> {
        try {
          const result: QueryResult<ModelType> = await this.runQuery(`SELECT * FROM ${this.table} WHERE id=($1)`, [id]);
          return result.rows[0];
        }
        catch (error) {
          throw new Error(`Could not run show query on ${this.table} for id ${id}: ${error}`);
        }
      }

      //  create ..needs to be implemented
      abstract create(type: ModelType): Promise<ModelType>;
      // edit ..needs to be implemented
      abstract edit(order: ModelType): Promise<ModelType>;
      //delete a spicifice row by id 
      async delete(id: string): Promise<ModelType> {
        try {
          const result: QueryResult<ModelType> = await this.runQuery(`DELETE FROM ${this.table} WHERE id=($1)`, [id]);
          return result.rows[0];
        }
        catch (error) {
          throw new Error(`Could not run delete query on ${this.table} for id ${id}: ${error}`);
        }
      }
    
      
     //Delete all entries. Used by tests, no route.
      async deleteAll(): Promise<void> {
        try {
          await this.runQuery(`DELETE FROM ${this.table}`);
        }
        catch (error) {
          throw new Error(`Could not delete all entries in ${this.table}: ${error}`);
        }
      }
    }
