import { ClerkProvider } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { App } from "../App";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <App />
      </ClerkProvider>
    </div>
  );
}
