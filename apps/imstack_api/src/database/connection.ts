import { drizzle } from "drizzle-orm/node-postgres";
import * as pg from "pg";
import { config } from "dotenv";
import * as schema from "./schema";

config();

export const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

const getConnection = (): Promise<pg.PoolClient> => {
  return new Promise((resolve, reject) => {
    pool.connect((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
      if (connection) {
        resolve(connection);
      }
    });
  });
};

export const database = drizzle(pool, { schema });

export default getConnection;
