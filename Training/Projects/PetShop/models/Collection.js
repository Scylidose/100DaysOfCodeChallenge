const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const pokeCollectionSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    Pokemons: [{
        Pokemon: {
            type: Number
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = pokeCollection = mongoose.model('pokeCollections', pokeCollectionSchema);