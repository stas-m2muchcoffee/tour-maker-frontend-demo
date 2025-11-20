import React from "react";

import { useLoader } from "../../hooks/use-loader";

export const AppLoader: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-100000 flex flex-col items-center justify-center bg-white/30">
      <div className="animate-spin rounded-full h-25 w-25 border-b-5 border-r-5 border-primary" />
    </div>
  );
};
