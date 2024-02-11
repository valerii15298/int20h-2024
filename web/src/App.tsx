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
import { Button } from "./components/ui/button";

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
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Lots />
          <SignOutButton>
            <Button className="mt-10">Sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
