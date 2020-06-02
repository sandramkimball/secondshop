const { ApolloServer } = require('apollo-server');
const cors = require('cors')

import typeDefs from './schema';
import resolver from './resolvers';


// initiate Apollo Server
const server = new ApolloServer({ typeDefs, resolver })
server.use(cors())

const PORT = 3300
server.listen(PORT => {
    console.log(`Running on Port ${Port}.`)
})