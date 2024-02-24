import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./db.js";
import { cdn } from "./cloudinary.js";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
    db,
    cdn,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
