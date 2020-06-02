const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors')
require('dotenv')

const Port = process.env.PORT || 5000


// Types
const typeDefs = require('./schema');

// Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = { Query, Mutation, User, Link }

// Initiate Express Application
const app = express()
app.use( expressJwt({
    secret: process.env.APP_SECRET,
    credentialsRequired: false
    })
)

// Initiate Apollo Gateway
const gateway = new ApolloGateway({
    serviceList: [{ name: URLSearchParams, url: 'http://localhost:3301'}],
    // Pass data to service
    buildService({ name, url }){
        return new RemoteGraphQLDataSource({
            url, 
            willSendRequest({ request, context }){
                request.http.headers.set(
                    'user',
                    context.user ? JSON.stringify(context.user) : null
                )
            }
        })
    }
})

// Initiate Apollo Server
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    gateway,
    subscriptions: false,
    context: ({ req }) => {
        const user = req.user || null;
        return { user };
    }
})

server.use(cors());
// Integrate Express with Apollo
server.applyMiddleware({ app }); 


server.listen(Port => {
    console.log(`Running on Port ${Port}.`)
})