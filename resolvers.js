//const { Categories, Products, Explore, Users } = require('./mocks/data')
const bcrpyt = require('bcrypt');
const db = require('./database');
const { sign } = require('jsonwebtoken');
require('dotenv');

const resolvers = {
    // Types uses obj
    // User: {
    //     users: async (obj, args, context, info) => db.users.findByPk(obj.email),
    // },
    Users: async (obj, args, context, info) => db.users.findByPk(obj.email),
    Products: async (obj, args, context, info) => db.products.findByPk(obj.id),
    Products: async (obj, args, context, info) => db.products.findAll(),
    Categories: async (obj, args, context, info) => db.categories.findAll(),
    Explore: async (obj, args, context, info) => db.explore.findAll(),

    // Query uses args
    Query: {
        categories: async ()=> db.categories.findAll(),
        explore: async ()=> db.explore.findAll(),
        user: async (obj, args, context, info)=>  {
            db.users.findBy( args.email )
        },
        products: async () => db.products.findAll(),
        product: async (obj, args, context, info)=>  {
            db.products.findBy( args.id )
        }
    },

    Mutation: {
        signup: async(_, { name, email, password }) => {
            const hashedPassword = await bcrpyt.hash(password, 10);
            const user = await db.users.create({
                name,
                email, 
                password: hashedPassword
            })

            return user.save()
        },

        login: async (_, { email, password }, { res }) => {
            const user = await db.users.findByPk(email);
            if(!user){
                throw new Error('Could not find user with that email.')
            }

            const valid = await bcrpyt.compare(password, user.password);
            if(!valid){
                throw new Error('Incorrect password.')
            }

            const accessToken = sign(
                { userId: user.id },
                process.env.APP_SECRET,
                { expiresIn: '5d' }
            );

            res.cookies("access-token", accessToken, {expires: 60 * 60 * 24 * 7})

            return user;
        }
    }
}

  
module.exports = {
    resolvers
}