const { Categories, Products, Explore, Users } = require('./mocks/data')
const bcrpyt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv');

const resolvers = {
    // Users: {
    //     Users: ({ res, req }) => {
    //         if (!req.user.id) {
    //           return null;
    //         }
      
    //         return Users.findOne(req.userId);
    //         // return Users.findOne(user=> user.id === object.id )
    //       }
    // },
    
    // Products: {
    //     Products: ({ res, req })=> {
    //         return Products
    //     }
    // },

    // Categories: {
    //     Categories: ({ res, req })=> {
    //         return Categories
    //     }
    // },
    
    // Explore: {
    //     Explore: ({ res, req })=> {
    //         return Explore
    //     }
    // },
    
    Query: {
        products(){ return Products },
        categories(){ return Categories },
        explore(){ return Explore },
        users({ id }){
            return Users.find(user => user.id === id)
        },
    },

    Mutation: {
        signup: async(_, { name, email, password }) => {
            const hashedPassword = await bcrpyt.hash(password, 10);
            await Users.create({
                name,
                email, 
                password: hashedPassword
            }).save();

            return true
        },

        login: async (_, { email, password }, { res }) => {
            const user = await Users.find({ where: { email } });
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