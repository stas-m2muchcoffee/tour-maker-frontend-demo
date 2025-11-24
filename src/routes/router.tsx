import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";

const AppLayout = lazy(() => import("../layouts/app-layout.tsx"));
const PublicRouteLayout = lazy(
  () => import("../layouts/public-route-layout.tsx")
);
const SignInPage = lazy(() => import("../pages/auth/sign-in/sign-in.tsx"));
const SignUpPage = lazy(() => import("../pages/auth/sign-up/sign-up.tsx"));
const PrivateRouteLayout = lazy(
  () => import("../layouts/private-route-layout.tsx")
);
const ToursPage = lazy(() => import("../pages/tours/tours.tsx"));
const CreateTourPage = lazy(
  () => import("../pages/create-tour/create-tour.tsx")
);
const TourPage = lazy(() => import("../pages/tour/tour.tsx"));
const ProfilePage = lazy(() => import("../pages/profile/profile.tsx"));

export const router = createBrowserRouter([
  {
    id: "app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RoutePath.TOURS} replace />,
      },
      {
        element: <PublicRouteLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={RoutePath.SIGN_IN} replace />,
          },
          {
            path: RoutePath.SIGN_IN,
            element: <SignInPage />,
          },
          {
            path: RoutePath.SIGN_UP,
            element: <SignUpPage />,
          },
        ],
      },
      {
        element: <PrivateRouteLayout />,
        children: [
          {
            path: RoutePath.TOURS,
            element: <ToursPage />,
            handle: {
              title: "Tours",
            },
          },
          {
            path: RoutePath.TOUR_CREATE,
            element: <CreateTourPage />,
            handle: {
              title: "Create tour",
            },
          },
          {
            path: RoutePath.TOUR,
            element: <TourPage />,
            handle: {
              title: "Tour details",
            },
          },
          {
            path: RoutePath.PROFILE,
            element: <ProfilePage />,
            handle: {
              title: "Profile",
            },
          },
        ],
      },
    ],
  },
]);
