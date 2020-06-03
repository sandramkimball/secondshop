const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const { verify } = require('jsonwebtoken');
const cors = require('cors');

require('dotenv');

// Resolvers & Types
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Initiate Express Application
const app = express();
app.use(cookieParser());
app.use(cors());
app.use( ( req, _, next ) => {
    const accessToken = req.cookies['access-token'];
    try {
        const data = verify(accessToken, process.env.APP_SECRET);
        req.userId = data.userId;
    } catch {
        // throw new Error('Error verifying token.')
    }
    next();
});

// Initiate Apollo Server
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});

// Integrate Express with Apollo
server.applyMiddleware({ app }); 


app.listen({port: 3300}, () => {
    console.log(`Running at http://localhost:3300${server.graphqlPath}`)
})