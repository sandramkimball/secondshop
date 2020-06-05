const { model, Schema } = require('mongoose');

const exploreSchema = new Schema({
        images: {
            type: String,
            required: true, 
        },
});

module.exports = model('Explore', exploreSchema)
