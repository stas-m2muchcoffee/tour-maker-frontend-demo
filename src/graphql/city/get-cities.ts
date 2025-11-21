import { gql } from "../__generated__";

gql(`
  query getCities {
    city {
      getCities {
        ...CityFields
      }
    }
  }
`);
