import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";

import { RoutePath } from "../enums/route-path.enum.ts";

const AppLayout = lazy(() => import("../layouts/app-layout.tsx"));
const PublicRoute = lazy(() => import("./public-route.tsx"));
const SignInPage = lazy(() => import("../pages/auth/sign-in/sign-in.tsx"));
const SignUpPage = lazy(() => import("../pages/auth/sign-up/sign-up.tsx"));
const PrivateRoute = lazy(() => import("./private-route.tsx"));
const ToursListPage = lazy(() => import("../pages/tours/tours-list.tsx"));
const CreateTourPage = lazy(() => import("../pages/tours/create-tour.tsx"));
const TourDetailsPage = lazy(() => import("../pages/tours/tour-details.tsx"));
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
            element: <ToursListPage />,
          },
          {
            path: RoutePath.TOUR_CREATE,
            element: <CreateTourPage />,
          },
          {
            path: RoutePath.TOUR_DETAILS,
            element: <TourDetailsPage />,
          },
          {
            path: RoutePath.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
