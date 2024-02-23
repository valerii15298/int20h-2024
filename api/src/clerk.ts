import { env } from "./config.js";
import {
  createClerkExpressWithAuth,
  createClerkClient,
  LooseAuthProp,
} from "@clerk/clerk-sdk-node";

export const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
export const authMiddleware = createClerkExpressWithAuth({
  secretKey: env.CLERK_SECRET_KEY,
  clerkClient: clerk,
});

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}
