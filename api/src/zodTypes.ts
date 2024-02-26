import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

const minStrLength = 1;
export const zStr = z.string().min(minStrLength);
export const zInt = z.coerce
  .number()
  .int()
  .min(minStrLength)
  .max(Number.MAX_SAFE_INTEGER);

// LOTS
const lotOverride = {
  name: zStr,
  description: zStr,
  startPrice: zInt,
  images: z.array(zStr),
  ownerId: zStr,
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
  ownerId: zStr,
} as const;
export const bidInputSchema = createInsertSchema(bids, bidOverride);
export type BidInput = z.infer<typeof bidInputSchema>;
export const bidSchema = createSelectSchema(bids, bidOverride);
export type BidSchema = z.infer<typeof bidInputSchema>;
