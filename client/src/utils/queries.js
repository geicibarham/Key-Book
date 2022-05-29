import { gql } from '@apollo/client';

export const QUERY_ME_BASIC = gql`
{
  me {
    _id
    username
    email
    SavedBooks {
        authors
        description
        title
        link
        image
        bookId
    }

  }`
