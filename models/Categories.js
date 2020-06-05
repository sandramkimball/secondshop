const { model, Schema } = require('mongoose');

const categoriesSchema = new Schema({
        name: {
            type: String,
            required: true, 
        },
        tags: {
            type: String,
        },
        count: {
            type: String,
        },
        images: {
            type: String,
        }
});

module.exports = model('Categories', categoriesSchema)
