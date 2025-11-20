import { Navigate, Outlet } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";
import { useAuth } from "../hooks/use-auth.ts";
import { AppLoader } from "../components/app-loader/index.tsx";

const PrivateRoute = () => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) return <AppLoader />;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePath.SIGN_IN} replace />
  );
};

export default PrivateRoute;
