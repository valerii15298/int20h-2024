import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

export const zString = z.string().min(1);
export const zInt = z.preprocess(
  (v) => Number(v),
  z.number().int().min(1).max(Number.MAX_SAFE_INTEGER)
);

// LOTS
const lotOverride = {
  name: zString,
  description: zString,
  startPrice: zInt,
  images: z.array(zString),
  ownerId: zString,
} as const;
export const lotInputSchema = createInsertSchema(lots, lotOverride);
export type LotInput = z.infer<typeof lotInputSchema>;
export const lotSchema = createSelectSchema(lots, lotOverride);
export type Lot = z.infer<typeof lotSchema>;

// BIDS
const bidOverride = {
  createdAt: zInt,
  lotId: zInt,
  price: zInt,
  ownerId: zString,
} as const;
export const bidInputSchema = createInsertSchema(bids, bidOverride);
export type BidInput = z.infer<typeof bidInputSchema>;
export const bidSchema = createSelectSchema(bids, bidOverride);
export type Bid = z.infer<typeof bidInputSchema>;
