import { createInsertSchema } from "drizzle-zod";
import { bids, lots } from "./schema.js";
import { z } from "zod";

const zString = z.string().min(1);
const zInt = z.preprocess((v) => Number(v), z.number().int().min(1));

export const lotInsertSchema = createInsertSchema(lots, {
  name: zString,
  description: zString,
  startPrice: zInt,
  images: z.array(zString),
  ownerId: zString,
});

export const bidInsertSchema = createInsertSchema(bids, {
  name: zString,
  description: zString,
  ownerId: zString,
});
