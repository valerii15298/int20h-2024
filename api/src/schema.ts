import * as pgCore from "drizzle-orm/pg-core";

export const lots = pgCore.pgTable("lots", {
  id: pgCore.integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: pgCore.varchar("name").notNull(),
  description: pgCore.varchar("description").notNull(),
  startPrice: pgCore.integer("startPrice").notNull(),
  images: pgCore.varchar("images").notNull().array().notNull(),
  ownerId: pgCore.varchar("ownerId").notNull(),
});

export const bids = pgCore.pgTable("bids", {
  id: pgCore.integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: pgCore.timestamp("createdAt").defaultNow().notNull(),
  ownerId: pgCore.varchar("ownerId").notNull(),
  price: pgCore.integer("price").notNull(),
  lotId: pgCore
    .integer("lotId")
    .notNull()
    .references(() => lots.id),
});
