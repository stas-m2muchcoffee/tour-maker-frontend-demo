import type {
  TourFieldsFragment,
  TourStopFieldsFragment,
} from "../../graphql/__generated__/graphql";

export type TourMapProps = {
  tour: TourFieldsFragment & { tourStops?: TourStopFieldsFragment[] | null };
};
