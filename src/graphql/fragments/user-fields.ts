import { gql } from '../__generated__';

gql(`
  fragment UserFields on User {
    id
    email
    token
    preferences
  }
`);
