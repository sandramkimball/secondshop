const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation')

const {  categories, products, explore, users  } = require('../data')
const typeDefs = require('../schema')
const resolvers = require('../resolvers/Query')
const port = 4001

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(port => {
    console.log(`User service ready on port ${port}.`)
})

