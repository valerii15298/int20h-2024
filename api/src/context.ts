import * as trpcExpress from "@trpc/server/adapters/express";
import { db } from "./db.js";
import { cdn } from "./cloudinary.js";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
  db,
  cdn,
});
export type Context = Awaited<ReturnType<typeof createContext>>;
