import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import { initTRPC } from "@trpc/server";
import { Context } from "./context.js";
import { lotInsertSchema } from "./zodTypes.js";

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
  lot: {
    list: t.procedure.query(({ ctx: { db } }) => db.query.lots.findMany()),
    create: t.procedure.input(lotInsertSchema).mutation(({ input }) => {
      console.log("Inserting a lot...");
      console.log(input);
    }),
  },
});

export type AppRouter = typeof appRouter;
