import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import "dotenv/config";
import express from "express";
import "shared";
import { z } from "zod";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }

  interface CustomJwtSessionClaims {
    // add custom claims
  }
}

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return `hello world`;
  }),
});

export type AppRouter = typeof appRouter;

async function main() {
  const port = Number(process.env.PORT);
  if (!port) {
    throw new Error("Env var 'PORT' is not set");
  }

  const app = express();

  app.use(ClerkExpressWithAuth());

  app.use((req, _res, next) => {
    console.log("⬅️ ", req.method, req.path, req.body, req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.listen(port, () => {
    console.log("listening on port " + port.toString());
  });
}

void main();
