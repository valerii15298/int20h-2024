import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
