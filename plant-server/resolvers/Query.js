import { categories, products, explore, users } from '../mocks/data';
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
            return users.find(profile => profile.id === id)
        },
        products(id){
            return products.find(item => item.id === id)
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

