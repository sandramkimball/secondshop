const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation')

const typeDefs = require('../schema')
const resolvers = require('../resolvers/Query')


const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    // Intercept other server HTTP header and add context
    context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user }
    }
});

const port = 4001
server.listen(port => {
    console.log(`User service ready on port ${port}.`)
})

