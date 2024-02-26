import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";
import { zStr } from "./zodTypes.js";

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
    CLERK_SECRET_KEY: zStr,

    PORT: zStr.pipe(
      z.coerce
        .number()
        .int()
        .min(2 ** 10),
    ),

    PGHOST: zStr,
    PGDATABASE: zStr,
    PGUSER: zStr,
    PGPASSWORD: zStr,
    PGENDPOINT_ID: zStr,
    PGSSL_MODE: z.enum(["require", "allow", "prefer", "verify-full"]),

    CLOUDINARY_CLOUD_NAME: zStr,
    CLOUDINARY_API_KEY: zStr,
    CLOUDINARY_API_SECRET: zStr,
  })
  .transform((o) => ({
    ...o,
    POSTGRES_URL: `postgresql://${o.PGUSER}:${o.PGPASSWORD}@${o.PGHOST}/${o.PGDATABASE}?sslmode=${o.PGSSL_MODE}&project=${o.PGENDPOINT_ID}`,
  }));

export const env = envSchema.parse(parsedConfig.parsed);
