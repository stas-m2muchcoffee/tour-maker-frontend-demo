import { gql } from "../__generated__";

gql(`
  fragment TourFields on Tour {
    id
    title
    description
    route
    city {
      ...CityFields
    }
    categories {
      ...CategoryFields
    }
  }
`);
