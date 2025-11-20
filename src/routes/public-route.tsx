import { Navigate, Outlet } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";
import { useAuth } from "../hooks/use-auth.ts";
import { AppLoader } from "../components/app-loader/index.tsx";

const PublicRoute = () => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) return <AppLoader />;

  return isAuthenticated ? (
    <Navigate to={RoutePath.HOME} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
