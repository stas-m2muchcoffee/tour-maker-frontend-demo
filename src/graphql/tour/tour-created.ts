import { gql } from "../__generated__";

gql(`
  subscription tourCreated {
    tourCreated {
      tour {
        ...TourFields
        tourStops {
          ...TourStopFields
        }
      }
      error
    }
  }
`);
