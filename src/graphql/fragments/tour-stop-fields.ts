import { gql } from "../__generated__";

gql(`
  fragment TourStopFields on TourStop {
    id
    name
    location {
      latitude
      longitude
    }
  }
`);
