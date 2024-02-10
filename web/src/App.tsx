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
import { HelloWorld } from "./HelloWorld";
import { lotInsertSchema } from "../../api/src/zodTypes";
import { z } from "zod";

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
          <SignInButton />
          <p>This content is public. Only signed out users can see this.</p>
        </SignedOut>
        <SignedIn>
          <HelloWorld />
          <SignOutButton />
          <p>This content is private. Only signed in users can see this.</p>
        </SignedIn>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
