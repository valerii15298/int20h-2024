import type { LooseAuthProp } from "@clerk/clerk-sdk-node";
import {
  createClerkClient,
  createClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

import { env } from "./config.js";

export const clerk = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
  publishableKey: env.VITE_CLERK_PUBLISHABLE_KEY,
});
export const authMiddleware = createClerkExpressWithAuth({
  clerkClient: clerk,
});

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}
