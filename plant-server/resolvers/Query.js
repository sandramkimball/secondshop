import { categories, products, explore, users } from '../mocks/data';
require('dotenv')
// define resolver
// this tells the server how to fetch when query is made
// "here, use this data:..."

const resolvers = {
    Users: {
        _resolveReference(object){
            return users.find(user=> user.id === object.id )
        }
    },
    
    Products: {
        _resolveReference(object){
            return users.find(project=> project.id === object.id )
        }
    },
    
    Query: {
        products() {return products},
        categories(){return categories},
        explore(){return explore},
        users({id}){
            return users.find(user => user.id === id)
        },
        products(id){
            return products.find(item => item.id === id)
        },
        // For logged in user via Federated Shcema
        // Not sure how it works
        viewer(_, { id }, { user }){
            return users.find(user=> user.id === user.sub);
        }
    },

    Mutation: {
        login(_, { email, passowrd }){
            const { id, permissions, roles } = users.find(
                user=> user.email === email && user.password === password
            );
            return jwt.sign(
                // Object containing HWT info we want to add to token payload
                {"https://localhost:3300/graphql": { roles, permissions } },
                // Secret
                `${process.env.APP_SECRET}`,
                // Additional options
                { subject: id, expiresIn: "1d" }
            );
        }
    }
}

// This reimplements the same functions with dedicated 
// function in a different file.

// function feed(parent, args, context, info) {
//     return (context.users(), context.products(), context.explore(), context.categories())
//   }
  
  module.exports = {
    resolvers
  }

