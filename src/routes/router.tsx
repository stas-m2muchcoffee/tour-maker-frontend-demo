import { createBrowserRouter } from "react-router";

import AuthPage from "../pages/AuthPage.tsx";
import { RoutePath } from "../enums/route-path.enum.ts";

export const router = createBrowserRouter([
  {
    path: RoutePath.AUTH,
    element: <AuthPage />,
  },
]);
