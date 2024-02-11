import { createInsertSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

const zString = z.string().min(1);
const zInt = z.preprocess(
  (v) => Number(v),
  z.number().int().min(1).max(Number.MAX_SAFE_INTEGER)
);

export const lotInsertSchema = createInsertSchema(lots, {
  name: zString,
  description: zString,
  startPrice: zInt,
  images: z.array(zString),
  ownerId: zString,
});

export const bidInsertSchema = createInsertSchema(bids, {
  createdAt: zInt,
  lotId: zInt,
  price: zInt,
  ownerId: zString,
});
