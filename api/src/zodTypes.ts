import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

export const zString = z.string().min(1);
export const zInt = z.preprocess(
  (v) => Number(v),
  z.number().int().min(1).max(Number.MAX_SAFE_INTEGER)
);

const lotOverride = {
  name: zString,
  description: zString,
  startPrice: zInt,
  images: z.array(zString),
  ownerId: zString,
} as const;

export const lotInputSchema = createInsertSchema(lots, lotOverride);
export const lotSchema = createSelectSchema(lots, lotOverride);

export const bidInsertSchema = createInsertSchema(bids, {
  createdAt: zInt,
  lotId: zInt,
  price: zInt,
  ownerId: zString,
});
