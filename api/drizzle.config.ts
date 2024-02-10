import type { Config } from "drizzle-kit";
import "./src/dotenv"; // because drizzle uses commonjs

export default {
  schema: "./src/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
