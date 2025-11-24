import { generatePath, Navigate, Outlet, useNavigate } from "react-router";
import { useSubscription } from "@apollo/client/react";
import { toast } from "react-toastify";

import { RoutePath } from "../enums/route-path.enum.ts";
import { useAuth } from "../hooks/use-auth.ts";
import { AppLoader } from "../components/app-loader/index.tsx";
import { AppHeader } from "../components/app-header/index.tsx";
import { TourCreatedDocument } from "../graphql/__generated__/graphql.ts";

const PrivateRouteLayout = () => {
  const { isInitialized, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useSubscription(TourCreatedDocument, {
    skip: !isAuthenticated,
    onData: ({ client, data }) => {
      const tourCreatedData = data?.data?.tourCreated;

      switch (true) {
        case !!tourCreatedData?.error:
          toast.error(tourCreatedData.error);
          break;
        case !!tourCreatedData?.tour:
          // evict cached "getTours" results so users see the newly created tour (since the infinite scroll gets used)
          client.cache.evict({ id: "TourQuery", fieldName: "getTours" });
          toast.success("Tour created successfully");
          navigate(
            generatePath(RoutePath.TOUR, { id: tourCreatedData.tour.id })
          );
          break;
      }
    },
  });

  if (!isInitialized) return <AppLoader />;

  return isAuthenticated ? (
    <>
      <AppHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to={RoutePath.SIGN_IN} replace />
  );
};

export default PrivateRouteLayout;
