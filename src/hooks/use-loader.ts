import { useContext } from 'react';

import type { LoaderContextType } from '../providers/loader-context';
import { LoaderContext } from '../providers/loader-context';

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
