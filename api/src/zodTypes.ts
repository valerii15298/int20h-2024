import { createInsertSchema } from "drizzle-zod";
import { lots } from "./schema.js";
import { z } from "zod";

export const lotInsertSchema = createInsertSchema(lots, {
  images: z.array(z.string()),
});
export const bidInsertSchema = createInsertSchema(lots);
