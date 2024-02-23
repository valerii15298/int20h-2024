import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import { env } from "./config.js";

const sql = postgres({
  host: env.PGHOST,
  database: env.PGDATABASE,
  username: env.PGUSER,
  password: env.PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${env.PGENDPOINT_ID}`,
  },
  max: 1,
});

export const db = drizzle(sql, { schema });
