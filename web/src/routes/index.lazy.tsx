import { SignedIn } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";

import { Lots } from "../Lots";
import { trpc } from "../trpc";

function Index() {
  const [queryClient] = useState(() => new QueryClient()),
    [trpcClient] = useState(() =>
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

export const Route = createLazyFileRoute("/")({
  component: Index,
});
