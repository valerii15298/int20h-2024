import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "path";
import { createContext } from "./context.js";
import { appRouter } from "./trpc.js";
import { env } from "./config.js";
import { authMiddleware } from "./clerk.js";
import { cdn } from "./cloudinary.js";

function main() {
  const app = express();

  app.use(express.static("public"));

  app.use(authMiddleware());

  app.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log("⬅️ ", req.method, req.path, req.body, req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.post("/upload", cdn.uploadMiddleware);

  app.get("*", (_, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${env.PORT}`);
  });
}

main();
