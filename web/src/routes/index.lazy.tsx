import { createLazyFileRoute } from "@tanstack/react-router";
import { SignedIn } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "../trpc";
import { Lots } from "../Lots";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [loggerLink(), httpBatchLink({ url: "/trpc" })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SignedIn>
          <Lots />
        </SignedIn>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
