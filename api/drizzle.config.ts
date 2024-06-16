import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const { parsed } = expand(config({ processEnv: {}, path: "../.env" }));
const { POSTGRES_URL } = z.object({ POSTGRES_URL: z.string() }).parse(parsed);

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: POSTGRES_URL,
  },
  schema: "./src/schema.ts",
});
