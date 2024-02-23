import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

const rawConfig = dotenv.config({ path: "../.env", processEnv: {} });
if (rawConfig.error) {
  throw rawConfig.error;
}

const parsedConfig = expand({ ...rawConfig, processEnv: {} });
if (parsedConfig.error) {
  throw parsedConfig.error;
}

const envSchema = z
  .object({
    CLERK_SECRET_KEY: z.string(),
    PORT: z.string().pipe(
      z.coerce
        .number()
        .int()
        .min(2 ** 10)
    ),
    PGHOST: z.string(),
    PGDATABASE: z.string(),
    PGUSER: z.string(),
    PGPASSWORD: z.string(),
    PGENDPOINT_ID: z.string(),
    PGSSL_MODE: z.enum(["require", "allow", "prefer", "verify-full"]),
  })
  .transform((o) => ({
    ...o,
    POSTGRES_URL: `postgresql://${o.PGUSER}:${o.PGPASSWORD}@${o.PGHOST}/${o.PGDATABASE}?sslmode=${o.PGSSL_MODE}&project=${o.PGENDPOINT_ID}`,
  }));

export const env = envSchema.parse(parsedConfig.parsed);
