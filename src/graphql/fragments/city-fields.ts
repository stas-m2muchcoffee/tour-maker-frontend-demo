import { gql } from "../__generated__";

gql(`
  fragment CityFields on City {
    id
    name
    countryName
  }
`);
