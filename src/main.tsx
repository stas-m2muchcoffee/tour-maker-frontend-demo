import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { router } from "./routes/router.tsx";
import { AppGraphqlProvider } from "./providers/app-graphql-provider.tsx";
import { LoaderProvider } from "./providers/loader-provider.tsx";
import { AppLoader } from "./components/app-loader/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoaderProvider>
      <AppGraphqlProvider>
        <Suspense fallback={null}>
          <RouterProvider router={router} />
        </Suspense>
        <AppLoader />
      </AppGraphqlProvider>
    </LoaderProvider>
  </StrictMode>
);
