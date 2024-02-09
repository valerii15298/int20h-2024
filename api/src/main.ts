import "dotenv/config";
import "shared";

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createContext } from "./context.js";
import { appRouter } from "./trpc.js";

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
