const { categories, products, explore, users } = require('./mocks/data');
const { validateSignup, validateLogin } = require('./util/validator');
const db = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bycrypt');
const { _ } = require('lodash');
require('dotenv');

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.APP_SECRET,
        {expiresIn: '3d'}
    );
}

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
            return category.find( name => name == args.name )
        },
        users: async ()=>  { return users },
        user: async (obj, args, context, info)=>  {
            return await users.find( user => user.email == args.email )

        },
        products: async () =>  { return products },
        product: async (obj, args, context, info)=>  {
            return products.find( (product) => product.id == args.id)
        }
    },

    Mutation: {
        signup: async(_, { name, email, password }) => {
            // Validate inputs
            const { valid, errors } = validateSignup(
                name, 
                email, 
                password
            );

            if(!valid){
                throw new Error('Signup error', { errors });
            }

            // Check if email already exists
            const user = await users.findOne({ email})
            if(user){
                throw new Error('There is already a user with that email.', {
                    errors: {
                        email: 'Email already in use.'
                    }
                })
            };

            // Hash password and create Token
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await users.create({
                name,
                email, 
                password: hashedPassword
            })

            const res = await user.save();
            const token = generateToken(user);
            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        login: async (_, { email, password }) => {
            // Validate user
            const { errors, valid } = validateLogin(email, password);
            if (!valid){
                throw new Error('Login error', { errors })
            }

            // Find user
            const user = await users.findOne({ email });
            if(!user){
                throw new Error('Could not find user with that email.')
            }

            // Check password
            const valid = await bcrypt.compare(password, user.password);
            if(!valid){
                throw new Error('Incorrect password.')
            }

            // Create token
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        }
    }
}

  
module.exports = {
    resolvers
}