import { initTRPC } from "@trpc/server";
import { Context } from "./context.js";
import { lotInputSchema, lotSchema, zInt } from "./zodTypes.js";
import { lots } from "./schema.js";
import { eq } from "drizzle-orm";
import * as clerk from "@clerk/clerk-sdk-node";
declare global {
  namespace Express {
    interface Request extends clerk.LooseAuthProp {}
  }

  interface CustomJwtSessionClaims {
    // add custom claims
  }
}

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  lot: {
    list: t.procedure.query(async ({ ctx: { db } }) => {
      const lots = await db.query.lots.findMany();
      const allUsers = await clerk.users.getUserList();
      console.log(allUsers);
      return Promise.all(
        lots.map(({ ownerId, ...l }) => {
          const { firstName, lastName } = allUsers.find(
            (u) => u.id === ownerId
          )!;

          const fullName = `${firstName} ${lastName}`;
          const owner = {
            fullName,
            id: ownerId,
          } as const;
          return {
            ...l,
            owner,
          };
        })
      );
    }),

    // CRUD
    create: t.procedure
      .input(lotInputSchema)
      .mutation(({ input, ctx: { db, req } }) =>
        db.insert(lots).values({ ...input, ownerId: req.auth.userId! })
      ),
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
