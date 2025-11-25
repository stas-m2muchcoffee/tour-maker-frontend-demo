import { useMemo, useState, useCallback } from "react";
import Map, {
  Layer,
  Source,
  type ViewState,
  type MapInstance,
  Marker,
} from "react-map-gl/mapbox";
import { lineString } from "@turf/helpers";
import type { LineString, FeatureCollection, Position } from "geojson";
import bbox from "@turf/bbox";
import { filter, map } from "lodash";

import type { TourMapProps } from "./types";
import type { TourStopFieldsFragment } from "../../graphql/__generated__/graphql";

export const TourMap: React.FC<TourMapProps> = ({ tour }) => {
  const [viewState, setViewState] = useState<ViewState>();

  const routeLineString = useMemo(() => {
    if (!tour.route) return null;
    const route = tour.route as FeatureCollection<LineString>;
    return filter(
      route.features,
      (data) => data.geometry.type === "LineString"
    )[0];
  }, [tour.route]);

  const fitTourStopsToMap = useCallback(
    (mapRef: MapInstance, tour: TourMapProps["tour"]) => {
      if (!mapRef || !tour?.tourStops?.length) return;

      const tourStopPositions = map<TourStopFieldsFragment, Position>(
        tour.tourStops,
        (tourStop) => [
          tourStop?.location?.longitude,
          tourStop?.location?.latitude,
        ]
      );
      const features = lineString(tourStopPositions);
      const [minLng, minLat, maxLng, maxLat] = bbox(features);

      mapRef?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 40,
          duration: 3000,
        }
      );
    },
    []
  );

  return (
    <div className="relative w-full h-[600px]">
      <Map
        {...viewState}
        onMove={(e) => {
          setViewState(e.viewState);
        }}
        onLoad={(e) => {
          fitTourStopsToMap(e.target, tour);
        }}
        attributionControl={false}
        reuseMaps={true}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        {map(tour.tourStops, (tourStop, index) => (
          <Marker
            key={tourStop.id}
            longitude={tourStop.location?.longitude}
            latitude={tourStop.location?.latitude}
          >
            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">
              {index + 1}
              {viewState?.zoom && viewState?.zoom > 15 && (
                <span className="absolute -top-1 -translate-y-full left-1/2 -translate-x-1/2 text-xs text-white text-center text-nowrap bg-primary/70 rounded-full px-4 py-1">
                  {tourStop.name}
                </span>
              )}
            </div>
          </Marker>
        ))}
        {!!routeLineString && (
          <Source
            type="geojson"
            data={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeLineString.geometry.coordinates,
              },
            }}
          >
            <Layer
              key={`${tour.id}-route-line`}
              type="line"
              paint={{
                "line-width": 3,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};
