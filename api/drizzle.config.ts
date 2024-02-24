import type { Config } from "drizzle-kit";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

const { parsed: env } = expand(config({ processEnv: {}, path: "../.env" }));
export default {
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env!["POSTGRES_URL"]!,
  },
} satisfies Config;
