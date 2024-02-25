import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { Button } from "../components/ui/button";

const TanStackRouterDevtools =
  process.env["NODE_ENV"] === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <ClerkProvider
      publishableKey={import.meta.env["VITE_CLERK_PUBLISHABLE_KEY"]}
    >
      <header>
        <SignedIn>
          <SignOutButton>
            <Button className="m-2 ml-auto block">Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button className="m-2 mr-auto block">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </header>
      <main className="m-2">
        <Outlet />
      </main>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </ClerkProvider>
  ),
});
