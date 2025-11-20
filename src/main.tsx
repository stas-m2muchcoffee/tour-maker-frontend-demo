import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { AppGraphqlProvider } from "./providers/app-graphql-provider.tsx";
import { AuthProvider } from "./providers/auth-provider.tsx";
import { LoaderProvider } from "./providers/loader-provider.tsx";
import { AppLoader } from "./components/app-loader/index.tsx";
import { router } from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoaderProvider>
      <AppGraphqlProvider>
        <AuthProvider>
          <Suspense fallback={null}>
            <RouterProvider router={router} />
          </Suspense>
          <AppLoader />
        </AuthProvider>
      </AppGraphqlProvider>
    </LoaderProvider>
  </StrictMode>
);
