import { gql } from "../__generated__";

gql(`
  mutation logOut {
    auth {
      logOut
    }
  }
`);
