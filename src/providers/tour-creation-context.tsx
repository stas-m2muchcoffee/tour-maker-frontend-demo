import { createContext } from "react";

import type { CreateTourInput } from "../graphql/__generated__/graphql";

export type TourCreationContextType = {
  isTourCreationInProgress: boolean;
  createTour: (input: CreateTourInput) => void;
};

const TourCreationContext = createContext<TourCreationContextType | undefined>(
  undefined
);

export { TourCreationContext };
