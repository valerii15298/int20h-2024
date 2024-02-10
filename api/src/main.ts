import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "path";
import { createContext } from "./context.js";
import "./dotenv.js";
import { appRouter } from "./trpc.js";

async function main() {
  const port = Number(process.env.PORT);
  if (!port) {
    throw new Error("Env var 'PORT' is not set");
  }

  const app = express();

  app.use(express.static("public"));

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
  app.get("*", (_, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });
  app.listen(port, () => {
    console.log("listening on port " + port.toString());
  });
}
void main();
