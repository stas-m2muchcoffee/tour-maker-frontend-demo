import { Navigate, Outlet } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";

const ProtectedRoute = () => {
  // TODO: Implement authentication check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.SIGN_IN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
