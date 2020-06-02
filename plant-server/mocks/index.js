const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation')
const jwt = require('jsonwebtoken');

const {  categories, products, explore, users  } = require('../data')
const typeDefs = require('../schema')
const resolvers = require('../resolvers/Query')
const port = 4001

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    // Intercept other server HTTP header and add context
    context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user }
    }
});

server.listen(port => {
    console.log(`User service ready on port ${port}.`)
})

