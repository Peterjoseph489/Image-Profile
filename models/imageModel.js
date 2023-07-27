const mongoose = require('mongoose');

const imageSchema = mongoose .Schema({
    image: {
        type: String
    },
    imageDescription: {
        type: String
    }
});

const imageModel = mongoose.model( 'images', imageSchema );

module.exports = imageModel;