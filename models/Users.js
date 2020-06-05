const { model, Schema } = require('mongoose');

const usersSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    budget: {
        type: String,
    },
    cap: {
        type: String,
    },
    avatar: {
        type: String,
    },
    // notifications: {
    //     type: Dataypes.BOOLEAN(true),
    // },
    // newsletter: {
    //     type: Dataypes.BOOLEAN(true),
    // },

});

module.exports = model('Users', usersSchema)