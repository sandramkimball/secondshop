const { model, Schema } = require('mongoose');

const productsSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    tags: {
        type: String,
    },
    description: {
        type: String,
        required: true, 
    },
    images: {
        type: String,
    }
});

 
module.exports = model('Products', productsSchema)