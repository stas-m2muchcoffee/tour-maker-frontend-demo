import { useMemo, useState, useCallback } from "react";
import Map, {
  Layer,
  Source,
  type ViewState,
  type MapInstance,
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
