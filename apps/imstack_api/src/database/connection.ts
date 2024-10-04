import { drizzle } from "drizzle-orm/node-postgres";
import * as pg from "pg";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config();

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const getConnection = (): Promise<pg.PoolClient> => {
  return new Promise((resolve, reject) => {
    pool.connect((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection as pg.PoolClient);
    });
  });
};

export const database = drizzle(pool, { schema });

export default getConnection;
