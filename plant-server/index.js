const { ApolloServer } = require('apollo-server');
const cors = require('cors')
require('dotenv')

import typeDefs from './schema.graphql';
// Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = { Query, Mutation, User, Link }

// initiate Apollo Server
const server = new ApolloServer({ typeDefs, resolvers, context: request=> {
    return {
        ...request, prisma
    }

    // const token = req.headers.authroization || '';
    // const user = getUser(token);
    // return {user}
} })

server.use(cors())

const Port = process.env.PORT || 3301

server.listen(Port => {
    console.log(`Running on Port ${Port}.`)
})