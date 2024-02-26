import type { Config } from "drizzle-kit";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

const { parsed } = expand(config({ processEnv: {}, path: "../.env" }));
const { POSTGRES_URL } = z.object({ POSTGRES_URL: z.string() }).parse(parsed);
export default {
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: POSTGRES_URL,
  },
} satisfies Config;
