import { useContext } from "react";

import type { TourCreationContextType } from "../providers/tour-creation-context";
import { TourCreationContext } from "../providers/tour-creation-context";

export const useTourCreation = (): TourCreationContextType => {
  const context = useContext(TourCreationContext);
  if (!context) {
    throw new Error(
      "useTourCreation must be used within a TourCreationProvider"
    );
  }
  return context;
};
