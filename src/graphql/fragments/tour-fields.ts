import { gql } from "../__generated__";

gql(`
  fragment TourFields on Tour {
    id
    title
    description
    city {
      ...CityFields
    }
    categories {
      ...CategoryFields
    }
  }
`);
