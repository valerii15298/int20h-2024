import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./db.js";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
    db,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
