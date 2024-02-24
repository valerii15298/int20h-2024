import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import path from "path";
import { createContext } from "./context.js";
import { appRouter } from "./trpc.js";
import { env } from "./config.js";
import { authMiddleware } from "./clerk.js";
import { cloudinary } from "./cloudinary.js";

async function main() {
  const app = express();

  app.use(express.static("public"));

  app.use(authMiddleware());

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

  app.post("/upload", (req, res) => {
    const fileStream = cloudinary.uploader.upload_stream(
      {},
      function (err, image) {
        if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
        }
        if (!image) return;
        res.send(image.url);
      }
    );
    req.pipe(fileStream);
  });

  app.get("*", (_, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });

  app.listen(env.PORT, () => {
    console.log(`listening on port ${env.PORT}`);
  });
}
void main();
