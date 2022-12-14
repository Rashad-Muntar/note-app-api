const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoriteBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    favorite: [Note!]!
    notes: [Note!]
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note!
    user(username: String!): User
    users: [User!]!
    currentUser: User!
    author: User!
    favoriteBy: User!
    favorite: [Note!]
  }

  type Mutation {
    newNote(content: String!): Note!
    deleteNote(id: ID!): Boolean
    updateNote(id: ID!, content: String!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, email: String!, password: String!): String!
    toggleFavorite(id: ID!): Note!
  }
  
`;
