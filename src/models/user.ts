import { ModelParentBase } from './modelParentBase';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
  }

   
  export class UserStore extends ModelParentBase<User> {
    private saltRounds: number = parseInt(process.env.SALT_ROUNDS as unknown as string);
    private myPlaintextPassword: string = process.env.MY_PLAIN_TEXT_PASSWORD as unknown as string;
  
    
    constructor() {
      super('users');
    }
  
    
      //Create user in database.
    async create(user: User): Promise<User> {
      const hash = bcrypt.hashSync(user.password + this.myPlaintextPassword, this.saltRounds);
      try {
        const result: QueryResult = await this.runQuery(`INSERT INTO ${this.table}
         (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *`,
          [user.user_name, user.first_name, user.last_name, hash]);
        return result.rows[0];
      }
      catch (error) {
        throw new Error(`Could not run create query on ${this.table}: ${error}`);
      }
    }
  
    
      //Edit user in database.
    async edit(user: User): Promise<User> {
      const hash = bcrypt.hashSync(`${user.password}${this.myPlaintextPassword}`, this.saltRounds);
  
      try {
        const result: QueryResult = await this.runQuery(`UPDATE ${this.table} SET user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id=$1 RETURNING *`, [user.id, user.user_name, user.first_name, user.last_name, hash]);
        return result.rows[0];
      }
      catch (error) {
        throw new Error(`Could not run edit query on ${this.table}: ${error}`);
      }
    }
  
    
      //Authenticate a user against the JWT.
    async authenticate(user_name: string, password: string): Promise<User|null> {
      let result: QueryResult|null;
      try {
        result = await this.runQuery(`SELECT * FROM ${this.table} WHERE user_name=($1)`, [user_name]);
      }
      catch (error) {
        result = null;
        throw new Error(`Could not run show query on ${this.table}: ${error}`);
      }
  
      if (!result?.rows.length) {
        return null; // No user found for user_name
      }
  
      const user = result.rows[0];
      if (!bcrypt.compareSync(`${password}${this.myPlaintextPassword}`, user.password)) {
        return null; // No authentication
      }
  
      return user;
    }
  } 