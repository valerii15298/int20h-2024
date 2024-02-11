import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import { initTRPC } from "@trpc/server";
import { Context } from "./context.js";
import { lotInputSchema, lotSchema, zInt } from "./zodTypes.js";
import { lots } from "./schema.js";
import { eq } from "drizzle-orm";

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
  lot: {
    list: t.procedure.query(({ ctx: { db } }) => db.query.lots.findMany()),

    // CRUD
    create: t.procedure
      .input(lotInputSchema)
      .mutation(({ input, ctx: { db } }) => db.insert(lots).values(input)),
    update: t.procedure
      .input(lotSchema)
      .mutation(({ input, ctx: { db } }) =>
        db.update(lots).set(input).where(eq(lots.id, input.id))
      ),
    delete: t.procedure
      .input(zInt)
      .mutation(({ input, ctx: { db } }) =>
        db.delete(lots).where(eq(lots.id, input))
      ),
  },
});

export type AppRouter = typeof appRouter;
