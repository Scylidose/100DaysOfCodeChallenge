const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pokemon = require('./Pokemon');

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
            type: Pokemon.type,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Collection = mongoose.model('collections', CollectionSchema);