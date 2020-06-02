const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const express = require('express');
const cors = require('cors')
require('dotenv')



const Port2 = process.env.PORT || 3400
const app = express()
const gateway = new ApolloGateway({
    serviceList: [{ name: URLSearchParams, url: 'http://localhost:3301'}]
})

// Types
const typeDefs = require('./schema');

// Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = { Query, Mutation, User, Link }

// initiate Apollo Server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    gateway,
})

server.use(cors())
// Integrate Express with Apollo
server.applyMiddleware({ app });


server.listen(Port2 => {
    console.log(`Running on Port ${Port2}.`)
})