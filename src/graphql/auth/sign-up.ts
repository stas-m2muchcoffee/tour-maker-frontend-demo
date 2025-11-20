import { gql } from "../__generated__";

gql(`
  mutation signUp($input: SignUpInput!) {
    auth {
      signUp(input: $input) {
        ...UserFields
      }
    }
  }
`);
