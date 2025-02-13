
const { gql } = require('apollo-server-express');


const typeDefs = gql`
 
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
      token: ID!
      user: User
  }
  type Book {
     bookId: String
      authors: [String]
      description: String
      image: String
      title: String
      link: String
  }
  
  type Query {
      me: User
  }

 

  type Mutation {
      login(email: String, username: String,password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(
      authors: [String],
      bookId: String!,
      image: String,
      link: String,
      description: String!,
      title: String!
      ): User
      removeBook(bookId: String!): User
  }`


module.exports = typeDefs;