import { gql } from "../__generated__";

gql(`
  mutation signIn($input: SignInInput!) {
    auth {
      signIn(input: $input) {
        ...UserFields
      }
    }
  }
`);
