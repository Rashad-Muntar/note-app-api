const express  = require('express')
const {gql, ApolloServer} = require("apollo-server-express")
const notes =  require('./data')
const app =  express()

app.get('/', (reg, res) => res.send("Hello World"))

const typeDefs = gql`
    type Query{
        hello: String
        notes: [Notes]
    }

    type Notes{
        id: ID!
        content: String!
        author: String!
    }
`

const resolvers = {
    Query:{
        hello: () => "Hello world",
        notes: () => notes
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