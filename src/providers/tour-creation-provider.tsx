import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { generatePath, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { TourCreationContext } from "./tour-creation-context.tsx";
import {
  CheckIfTourCreationInProgressDocument,
  CreateTourDocument,
  TourCreatedDocument,
} from "../graphql/__generated__/graphql";
import { useAuth } from "../hooks/use-auth";
import { RoutePath } from "../enums/route-path.enum";
import type { CreateTourDto } from "../pages/create-tour/dtos";

export const TourCreationProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isTourCreationInProgress, setIsTourCreationInProgress] =
    useState(false);

  const { data: isTourCreationInProgressData } = useQuery(
    CheckIfTourCreationInProgressDocument,
    {
      fetchPolicy: "network-only",
      skip: !isAuthenticated,
    }
  );

  const [createTourMutation] = useMutation(CreateTourDocument, {
    onCompleted: (data) => {
      const createTourData = data?.tour?.createTour;
      if (!createTourData) return;

      setIsTourCreationInProgress(true);
      toast.success(
        "Tour creation process started successfully. You will be notified when it is ready."
      );
      navigate(RoutePath.TOURS);
    },
  });

  useSubscription(TourCreatedDocument, {
    skip: !isTourCreationInProgress,
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

      setIsTourCreationInProgress(false);
    },
  });

  useEffect(() => {
    if (isTourCreationInProgressData) {
      setIsTourCreationInProgress(
        !!isTourCreationInProgressData?.tour?.checkIfTourCreationInProgress
      );
    }
  }, [isTourCreationInProgressData]);

  const createTour = useCallback(
    (input: CreateTourDto) => {
      createTourMutation({ variables: { input } });
    },
    [createTourMutation]
  );

  const value = useMemo(
    () => ({
      isTourCreationInProgress,
      createTour,
    }),
    [isTourCreationInProgress, createTour]
  );

  return (
    <TourCreationContext.Provider value={value}>
      {children}
    </TourCreationContext.Provider>
  );
};
