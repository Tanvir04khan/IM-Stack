import { defineConfig } from "drizzle-kit";

const DB_URL = process.env.POSTGRES_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  migrations: {
    table: "migrations_custom", // default `__drizzle_migrations`,
    schema: "imstack",
  },
  out: "./src/database",
  dbCredentials: {
    url: DB_URL ?? "",
  },
});
