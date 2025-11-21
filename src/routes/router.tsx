import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";

const AppLayout = lazy(() => import("../layouts/app-layout.tsx"));
const PublicRoute = lazy(() => import("./public-route.tsx"));
const SignInPage = lazy(() => import("../pages/auth/sign-in/sign-in.tsx"));
const SignUpPage = lazy(() => import("../pages/auth/sign-up/sign-up.tsx"));
const PrivateRoute = lazy(() => import("./private-route.tsx"));
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
        element: <PublicRoute />,
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
        element: <PrivateRoute />,
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
