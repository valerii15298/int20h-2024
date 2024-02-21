import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

export const zString = z.string().min(1);

// Workaround for ug in trpc(cannot properly infer z.preprocess)
const rawInt = z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);
export const zInt = z.preprocess((v) => Number(v), rawInt);

// LOTS
const lotOverride = {
  name: zString,
  description: zString,
  startPrice: zInt,
  images: z.array(zString),
  ownerId: zString,
} as const;
export const lotInputSchema = createInsertSchema(lots, lotOverride).omit({
  id: true,
  ownerId: true,
});
export type LotInput = z.infer<typeof lotInputSchema>;
export const lotSchema = createSelectSchema(lots, lotOverride).omit({
  ownerId: true,
});
export type LotSchema = z.infer<typeof lotSchema>;

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
export type BidSchema = z.infer<typeof bidInputSchema>;
