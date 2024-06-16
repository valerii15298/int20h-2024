import type * as trpcExpress from "@trpc/server/adapters/express";

import { cdn } from "./cloudinary.js";
import { db } from "./db.js";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {
    cdn,
    db,
    req,
    res,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
