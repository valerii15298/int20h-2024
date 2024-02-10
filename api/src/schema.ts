import * as pgCore from "drizzle-orm/pg-core";

export const lots = pgCore.pgTable("lots", {
  id: pgCore.serial("id").primaryKey().notNull(),
  name: pgCore.text("name").notNull(),
  description: pgCore.text("description").notNull(),
  startPrice: pgCore.integer("startPrice").notNull(),
  images: pgCore.text("images").array().notNull(), // for simplicity store images in database as base64 encoded strings
  ownerId: pgCore.varchar("ownerId").notNull(),
  // TODO: expire time and closing lot after that time, columns to add: open(boolean), expiresAt
});

export const bids = pgCore.pgTable("bids", {
  id: pgCore.serial("id").primaryKey().notNull(),
  name: pgCore.varchar("name").notNull(),
  description: pgCore.text("description").notNull(),

  ownerId: pgCore.varchar("ownerId").notNull(),
  lotId: pgCore
    .integer("lotId")
    .notNull()
    .references(() => lots.id),
});

export const schema = {
  lots,
  bids,
};
