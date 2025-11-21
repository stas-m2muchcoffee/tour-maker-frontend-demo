import { gql } from "../__generated__";

gql(`
  query getRecommendedTours {
    tour {
      getRecommendedTours {
        ...TourFields
      }
    }
  }
`);
