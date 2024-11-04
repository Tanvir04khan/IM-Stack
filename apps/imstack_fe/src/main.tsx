import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const el = document.getElementById("root");

const publishbleKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
if (el) {
  const root = createRoot(el);
  const clientInstance = new QueryClient();

  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={publishbleKey ?? ""}>
        <QueryClientProvider client={clientInstance}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider storageKey="imstackTheme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
