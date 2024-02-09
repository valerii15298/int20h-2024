import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import { initTRPC } from "@trpc/server";
import { Context } from "./context.js";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }

  interface CustomJwtSessionClaims {
    // add custom claims
  }
}

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return `hello world`;
  }),
});

export type AppRouter = typeof appRouter;
