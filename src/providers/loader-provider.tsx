import React, { useCallback, useState } from 'react';
import { filter } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import type { LoaderContextType } from './loader-context';
import { LoaderContext } from './loader-context';

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loadingRequestIds, setLoadingRequestIds] = useState<string[]>([]);

  const showLoader = useCallback((): string => {
    const id = uuidv4();
    setLoadingRequestIds((prev) => [...prev, id]);
    return id;
  }, []);

  const hideLoader = useCallback((id: string) => {
    setLoadingRequestIds((prev) => filter(prev, id));
  }, []);

  const value: LoaderContextType = {
    isLoading: !!loadingRequestIds.length,
    showLoader,
    hideLoader,
  };

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
