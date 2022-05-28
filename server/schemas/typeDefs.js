// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  },
  
  type Book {
      authors: String
      description: String

      image: String
      title: String
      bookId: String
      link: String
    

  }`
  

  module.exports = typeDefs;