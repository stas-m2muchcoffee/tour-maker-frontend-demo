import { useLocation, useMatches } from "react-router";
import { useMemo } from "react";
import { get, last } from "lodash";

import { useAuth } from "../../hooks/use-auth";
import { AppButton } from "../app-button";
import { RoutePath } from "../../enums/route-path.enum";
import { useTourCreation } from "../../hooks/use-tour-creation";

export const AppHeader = () => {
  const { logOut, logOutLoading } = useAuth();
  const { isTourCreationInProgress } = useTourCreation();
  const { pathname } = useLocation();
  const matches = useMatches();

  const isTourCreationPage = pathname === RoutePath.TOUR_CREATE;
  const isToursPage = pathname === RoutePath.TOURS;
  const isProfilePage = pathname === RoutePath.PROFILE;

  const title = useMemo(() => {
    return get(last(matches), "handle.title", "Tour Maker");
  }, [matches]);

  return (
    <header className="relative w-full flex items-center justify-between gap-4 border-b border-border-primary pb-1 mb-4">
      {!isToursPage && (
        <AppButton
          fill="clear"
          iconName="arrow-left"
          to={RoutePath.HOME}
          className="pl-0"
        />
      )}

      <h2 className="text-primary font-bold">{title}</h2>

      <div className="flex items-center gap-1">
        {!isTourCreationPage && (
          <AppButton
            fill="outline"
            text="Create tour"
            to={RoutePath.TOUR_CREATE}
          />
        )}
        {!isProfilePage && (
          <AppButton
            fill="outline"
            iconName="user-round"
            to={RoutePath.PROFILE}
          />
        )}
        <AppButton
          fill="outline"
          iconName="log-out"
          onClick={logOut}
          disabled={logOutLoading}
        />
      </div>

      {isTourCreationInProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5">
          <div className="h-full w-full rounded-full bg-primary animate-horizontal-loader" />
        </div>
      )}
    </header>
  );
};
