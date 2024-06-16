import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "path";

import { authMiddleware } from "./clerk.js";
import { cdn } from "./cloudinary.js";
import { env } from "./config.js";
import { createContext } from "./context.js";
import { appRouter } from "./trpc.js";

function main() {
  const app = express();

  app.use(express.static("public"));

  app.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log("⬅️ ", req.method, req.path, req.body, req.query);
    next();
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use(authMiddleware());

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      createContext,
      router: appRouter,
    }),
  );

  app.post("/upload", (req, res) => {
    cdn.uploadMiddleware(req, res);
  });

  app.get("*", (_, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${env.PORT}`);
  });
}

main();
