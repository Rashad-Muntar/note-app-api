const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//local models
const db = require("./db");
const resolvers = require("./resolvers");
const models = require("./models");
const typeDefs = require("./schema");

const app = express();

const getUser = token => {
  if(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRETE);
    } catch (err) {
      throw new Error("Session is invalid");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  DateTime: GraphQLDateTime,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

(async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
})();

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);
app.listen(port, () =>
  console.log(`listening to port ${port}/${server.graphqlPath}`)
);

