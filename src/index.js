const express  = require('express')
const {gql, ApolloServer} = require("apollo-server-express")
const notes =  require('./data')
const app =  express()

app.get('/', (reg, res) => res.send("Hello World"))

const typeDefs = gql`
    type Query{
        hello: String
        notes: [Note]
        note(id: ID!): Note!
    }

    type Note{
        id: ID!
        content: String!
        author: String!
    }
`

const resolvers = {
    Query:{
        hello: () => "Hello world",
        notes: () => notes,
        note: (parent, args) => {
           return notes.find(note => note.id === args.id) 
        } 
    }
}

const server = new ApolloServer({typeDefs, resolvers})

const runServer = async () => {
    await server.start()
    server.applyMiddleware({app, path:'/api'})
}
runServer()
 
const port  = process.env.PORT || 4000
app.listen(port, () => console.log(`listening to port ${port}/${server.graphqlPath}`))