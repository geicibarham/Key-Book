import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String!) {
    login(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
# $ sign is a variable and means that the id coming from front end will vary 
  mutation saveBook(

          $authors: [String],
          $link: String,
          $description: String!,
          $bookId: String!
          $image: String,
          $title: String!
         ){saveBook (
    authors: $authors,
     description: $description,
     bookId: $bookId,
    image: $image,
    link: $link,
    title: $title
  )
  {
      _id
      email
      username
      savedBooks{
          authors
          description
          bookId
          image
          link
          title
 }
  }
    
 }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
 removeBook(bookId: $bookId) {
    _id
    email
    username
   savedBooks{
    authors
    description
    bookId
    image
     link
    title
    }
  }
}`
