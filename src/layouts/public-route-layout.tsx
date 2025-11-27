import { Navigate, Outlet } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";
import { useAuth } from "../hooks/use-auth.ts";

const PublicRouteLayout = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to={RoutePath.HOME} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRouteLayout;
