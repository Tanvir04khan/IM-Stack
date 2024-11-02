import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes/routes";

const el = document.getElementById("root");

const publishbleKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
if (el) {
  const root = createRoot(el);

  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={publishbleKey ?? ""}>
        <ThemeProvider storageKey="imstackTheme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
