const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CollectionSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    lemgth: {
        type: Number,
        required: true
    },
    Pokemons: [{
        Pokemon: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Collection = mongoose.model('collections', CollectionSchema);