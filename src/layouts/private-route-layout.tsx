import { Navigate, Outlet } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";
import { useAuth } from "../hooks/use-auth.ts";
import { AppHeader } from "../components/app-header/index.tsx";
import { TourCreationProvider } from "../providers/tour-creation-provider.tsx";

const PrivateRouteLayout = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <TourCreationProvider>
      <AppHeader />
      <Outlet />
    </TourCreationProvider>
  ) : (
    <Navigate to={RoutePath.SIGN_IN} replace />
  );
};

export default PrivateRouteLayout;
