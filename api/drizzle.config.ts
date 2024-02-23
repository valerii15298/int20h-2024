import type { Config } from "drizzle-kit";
import { env } from "./src/config.js";

export default {
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
} satisfies Config;
