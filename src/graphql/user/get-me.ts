import { gql } from "../__generated__";

gql(`
  query getMe {
    user {
      getMe {
        ...UserFields
      }
    }
  }
`);
