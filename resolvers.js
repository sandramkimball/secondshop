const { validateSignup, validateLogin } = require('./util/validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { _ } = require('lodash');
require('dotenv').config();

// Models
const Users = require('./models/Users');
const Products = require('./models/Products');
const Categories = require('./models/Categories');
const Explore = require('./models/Explore');

// Token function
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
    // Queries reads args
    Query: {
        explore: async ()=> { return Explore.find() },
        categories: async ()=> { return Categories.find() },
        category: async (obj, args, context, info)=>  {
            return Categories.find( name => name == args.name )
        },
        users: async ()=>  { return Users.find() },
        user: async (obj, args, context, info)=>  {
            return await Users.find( user => user.email == args.email )

        },
        products: async () =>  { return Products.find() },
        product: async (obj, args, context, info)=>  {
            return Products.find( product => product.id == args.id)
        }
    },

    Mutation: {
        signup: async(_, { name, email, password }) => {
            // Validate inputs
            // const { valid, errors } = validateSignup(
            //     name, 
            //     email, 
            //     password
            // );

            // if(!valid){
            //     throw new Error('Signup error', { errors });
            // }

            // Check if email already exists
            const user = await Users.findOne({ email})
            if(user){
                throw new Error('There is already a user with that email.', {
                    errors: {
                        email: 'Email already in use.'
                    }
                })
            };

            // Hash password and create Token
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                name,
                email, 
                password: hashedPassword
            })

            const res = await newUser.save();
            const token = generateToken(newUser);
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
            const user = await Users.findOne({ email });
            if(!user){
                throw new Error('Could not find user with that email.')
            }

            // Check password
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
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