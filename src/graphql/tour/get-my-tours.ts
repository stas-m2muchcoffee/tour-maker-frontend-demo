import { gql } from "../__generated__";

gql(`
  query getTours($filter: GetToursFilterInput, $paging: PagingInput) {
    tour {
      getTours(filter: $filter, paging: $paging) {
        total
        results {
          ...TourFields
        }
      }
    }
  }
`);
