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

const MIN_PORT = 2 ** 10;

const envSchema = z
  .object({
    CLERK_SECRET_KEY: zStr,
    VITE_CLERK_PUBLISHABLE_KEY: zStr,

    PORT: zStr.pipe(z.coerce.number().int().min(MIN_PORT)),

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
  .transform((env) => ({
    ...env,
    POSTGRES_URL: `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}/${env.PGDATABASE}?sslmode=${env.PGSSL_MODE}&project=${env.PGENDPOINT_ID}`,
  }));

export const env = envSchema.parse(parsedConfig.parsed);
