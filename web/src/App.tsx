import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./trpc";
import { lotInsertSchema } from "../../api/src/zodTypes";
import { z } from "zod";
import { Lots } from "./Lots";

function getDefaultLot(): z.infer<typeof lotInsertSchema> {
  return {
    name: "",
    description: "",
    images: [""],
    startPrice: 1,
    ownerId: "",
  };
}
console.log(lotInsertSchema.parse(getDefaultLot()));

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [loggerLink(), httpBatchLink({ url: "/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <br />
        <SignedOut>
          <SignInButton>
            <button
              type="button"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Lots />
          <SignOutButton>
            <button
              type="button"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
