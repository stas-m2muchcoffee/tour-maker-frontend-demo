import { gql } from "../__generated__";

gql(`
  query getTour($input: GetTourInput!) {
    tour {
      getTour(input: $input) {
        ...TourFields
        tourStops {
          ...TourStopFields
        }
      }
    }
  }
`);
