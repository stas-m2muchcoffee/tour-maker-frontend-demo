import { gql } from "../__generated__";

gql(`
  mutation createTour($input: CreateTourInput!) {
    tour {
      createTour(input: $input)
    }
  }
`);
