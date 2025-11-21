import { gql } from "../__generated__";

gql(`
  query getCategories {
    category {
      getCategories {
        ...CategoryFields
      }
    }
  }
`);
