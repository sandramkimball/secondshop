const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv');

// Config
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

// Cookies?
app.use(cookieParser());
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

// Connect to DB
// mongoose
//     .connect(
//         `mongodb+srv:${process.env.MONGO_USER}:${process.env.MONGO_PASS}
//         @cluster0-ntrwpmongodb.net/${process.env.MONGO_DB}?retrywrites=true`
//     )
//     .then(()=> {
//         // Run server
//         const PORT = process.env.PORT || 5000;
//         app.listen(PORT, () => {
//             console.log(`---Port: ${PORT}.`)
//             console.log(`---Host: http://localhost:${PORT}${server.graphqlPath}`)
//         })
//     })
//     .catch(err=> {
//         console.log(err)
//     });

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true}, 
    ()=> console.log('  ---MONGOOSE: connected') )

const db = mongoose.connection
db.once('open', ()=> console.log('  ---DB: connected'))
db.on('error', err => console.log('  ---DB: error!', err))

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`---Port: ${PORT}.`)
    console.log(`---Host: http://localhost:${PORT}${server.graphqlPath}`)
})
    