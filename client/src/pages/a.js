// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

type Auth {
  token: ID!
  user: User
}

type Book {
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

type Query {
    me: User
  }

  type Mutation {
    login(email: String, username: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String],
      description: String!,
      bookId: String!,
      image: String,
      title: String!
      ): User
    removeBook(bookId: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;