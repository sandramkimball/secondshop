const bcrpyt = require('bcrypt');
const { categories, products, explore, users } = require('./mocks/data');
const db = require('./database');
const { sign } = require('jsonwebtoken');
const { _ } = require('lodash');
require('dotenv');

const resolvers = {
    // Types reads obj
    // User: ({ userId }) => from("users").where({ id: userId }).first(),
    // Product: async (obj, args, context, info) => products.findByPk(obj.id),
    // Product: async (obj, args, context, info) => products.findByPk(),
    // Category: async (obj, args, context, info) => categories.findByPk(),
    // Explore: async (obj, args, context, info) => explore.findByPk(),

    // Queries reads args
    Query: {
        explore: async ()=> { return explore },
        categories: async ()=> { return categories },
        category: async (obj, args, context, info)=>  {
            return category.find( name => name === args.name )
        },
        users: async ()=>  { return users },
        user: async (obj, args, context, info)=>  {
            return users.findBy( args.email )
        },
        products: async () =>  { return products },
        product: async (obj, args, context, info)=>  {
            return products.find(id=> id === args.id)
        }
    },

    // Mutation: {
    //     signup: async(_, { name, email, password }) => {
    //         const hashedPassword = await bcrpyt.hash(password, 10);
    //         const user = await users.create({
    //             name,
    //             email, 
    //             password: hashedPassword
    //         })

    //         return user.save()
    //     },

    //     login: async (_, { email, password }, { res }) => {
    //         const user = await users.findByPk(email);
    //         if(!user){
    //             throw new Error('Could not find user with that email.')
    //         }

    //         const valid = await bcrpyt.compare(password, user.password);
    //         if(!valid){
    //             throw new Error('Incorrect password.')
    //         }

    //         const accessToken = sign(
    //             { userId: user.id },
    //             process.env.APP_SECRET,
    //             { expiresIn: '5d' }
    //         );

    //         res.cookies("access-token", accessToken, {expires: 60 * 60 * 24 * 7})

    //         return user;
    //     }
    // }
}

  
module.exports = {
    resolvers
}