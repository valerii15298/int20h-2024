import { initTRPC } from "@trpc/server";
import * as d from "drizzle-orm";

import { clerk } from "./clerk.js";
import type { Context } from "./context.js";
import { lots } from "./schema.js";
import { lotInputSchema, lotSchema, zInt } from "./zodTypes.js";

const tr = initTRPC.context<Context>().create();

export const appRouter = tr.router({
  lot: {
    list: tr.procedure.query(async ({ ctx: { db } }) => {
      const lots = await db.query.lots.findMany();
      const allUsers = await clerk.users.getUserList();

      return Promise.all(
        lots.map(({ ownerId, ...lot }) => {
          const { firstName, lastName } = allUsers.data.find(
            (user) => user.id === ownerId,
          )!;
          const fullName = `${firstName} ${lastName}`;
          const owner = {
            fullName,
            id: ownerId,
          } as const;
          return {
            ...lot,
            owner,
          };
        }),
      );
    }),

    // CRUD
    create: tr.procedure
      .input(lotInputSchema)
      .mutation(({ input, ctx: { db, req } }) =>
        db.insert(lots).values({ ...input, ownerId: req.auth.userId! }),
      ),
    update: tr.procedure
      .input(lotSchema)
      .mutation(({ input: { id, ...input }, ctx: { db } }) =>
        db.update(lots).set(input).where(d.eq(lots.id, id)),
      ),
    delete: tr.procedure
      .input(zInt)
      .mutation(async ({ input, ctx: { db, cdn } }) => {
        const resp = await db
          .delete(lots)
          .where(d.eq(lots.id, input))
          .returning();
        for (const lot of resp)
          for (const img of lot.images) await cdn.deleteByUrl(img);
      }),
  },
});

export type AppRouter = typeof appRouter;
