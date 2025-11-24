import { gql } from "../__generated__";

gql(`
  mutation updateMyPreferences($input: UpdateUserPreferencesInput!) {
    user {
      updateMyPreferences(input: $input) {
        ...UserFields
      }
    }
  }
`);
