const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');
require('dotenv');


async function signup(parent, args, context, info){
    // 1) Encrypt the password
    const hashedPassword = await bcrypt.hash(args.password, 10)

    // 2) Set new user
    const { password, ...user } = await context.prisma.createUser({ ...args, password: hashedPassword })

    // 3) Create token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET )

    // 4) 
    return { token, user }
}

async function login(parent, args, context, ingo){
    // 1) Grab login info and check if user is in database
    const { password, ...user } = await context.prisma.user({ email: args.email })
    if(!user){
        throw new Error('No user found. Check your email is correct.')
    }

    // 2) Check if password is correct.
    const valid = await bcrypt.compare(args.paddword, password)
    if(!valid){
        throw new Error('Password incorrect.')
    }

    // 3) Create token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    // 4) 
    return { token, user }
}

function post(parent, args, context, ingo){
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
    })
}


module.exports = { signup, login, post }