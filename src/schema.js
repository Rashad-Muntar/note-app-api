const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note!
    users: [User!]
    user(username: String!): User!
    me: User!
  }

  type Mutation {
    newNote(content: String!): Note!
    deleteNote(id: ID!): Boolean
    updateNote(id: ID!, content: String!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, email: String!, password: String!): String!
  }
  
`;
