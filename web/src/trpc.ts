import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../api/src";

export const trpc = createTRPCReact<AppRouter>();
