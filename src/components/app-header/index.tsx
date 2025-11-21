import { useLocation, useMatches } from "react-router";
import { useMemo } from "react";
import { get, last } from "lodash";

import { useAuth } from "../../hooks/use-auth";
import { AppButton } from "../app-button";
import { RoutePath } from "../../enums/route-path.enum";

export const AppHeader = () => {
  const { logOut } = useAuth();
  const { pathname } = useLocation();
  const matches = useMatches();

  const isTourCreationPage = pathname === RoutePath.TOUR_CREATE;
  const isToursPage = pathname === RoutePath.TOURS;

  const title = useMemo(() => {
    return get(last(matches), "handle.title", "Tour Maker");
  }, [matches]);

  return (
    <header className="w-full flex items-center justify-between gap-4 border-b border-border-primary pb-1 mb-4">
      <div className="flex items-center gap-1">
        {!isToursPage && (
          <AppButton fill="clear" iconName="arrow-left" to={RoutePath.HOME} />
        )}
        <h2 className="text-primary font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-1">
        {!isTourCreationPage && (
          <AppButton
            fill="outline"
            text="Create tour"
            to={RoutePath.TOUR_CREATE}
          />
        )}
        <AppButton fill="outline" iconName="log-out" onClick={logOut} />
      </div>
    </header>
  );
};
