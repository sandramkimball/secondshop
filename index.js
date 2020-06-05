const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
//const jwt = require('express-jwt');
const { verify } = require('jsonwebtoken');
const cors = require('cors');
require('dotenv');

// Resolvers & Types
//const { schema } = require('./schema.gql');
const { typeDefs } = require('./schema.js');
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
    } 
    catch { }
    next();
});

// Initiate Apollo Server
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    // models: [
    //     require('./models/Users'),
    //     require('./models/Products'),
    //     require('./models/Categories'),
    //     require('./models/Explore'),
    // ],
    context: ({ req, res }) => ({ req, res }),
});

// Integrate Express with Apollo
server.applyMiddleware({ app }); 


app.listen({port: 3300}, () => {
    console.log(`Running at http://localhost:3300${server.graphqlPath}`)
})