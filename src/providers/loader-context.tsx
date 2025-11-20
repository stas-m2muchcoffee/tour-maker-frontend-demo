import { createContext } from 'react';

export type LoaderContextType = {
  isLoading: boolean;
  showLoader: () => string;
  hideLoader: (id: string) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export { LoaderContext };
