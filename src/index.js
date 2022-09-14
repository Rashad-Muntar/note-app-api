const express = require("express");
const { gql, ApolloServer } = require("apollo-server-express");
const db = require("./db");
const notes = require("./data");
const models = require("./models");

const app = express();
require("dotenv").config();

app.get("/", (reg, res) => res.send("Hello World"));

const typeDefs = gql`
  type Query {
    hello: String
    notes: [Note]
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }

  type Note {
    id: ID!
    content: String!
    author: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world",
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },

  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Adam Scott",
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const runServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
};
runServer();

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);
app.listen(port, () =>
  console.log(`listening to port ${port}/${server.graphqlPath}`)
);
