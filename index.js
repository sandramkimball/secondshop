const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// DB Config
const URI = process.env.DB_CONNECT

// Middleware
const isAuth = require('./util/isAuth');
const cors = require('cors');

// Resolvers & Types
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers');

// Initiate Express Application
const app = express();
app.use(cors());
app.use(isAuth)

// Initiate Apollo Server
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});

// Integrate Express with Apollo
server.applyMiddleware({ app }); 

// Connect to DB
mongoose.connect(URI, {  useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true}, 
    ()=> console.log('---Mongoose: Connected') )

const db = mongoose.connection
db.once('open', ()=> console.log('---Db: Plants'))
db.on('error', err => console.log('---Db: ERROR!', err))

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`---Port: ${PORT}.`)
    console.log(`---Host: http://localhost:${PORT}${server.graphqlPath}`)
})
    