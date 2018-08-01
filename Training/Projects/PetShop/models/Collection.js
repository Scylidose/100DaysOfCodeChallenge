const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pokemon = require('./Pokemon');

// Create Schema
const CollectionSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    Pokemons: [{
        Pokemon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pokemons',
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Collection = mongoose.model('collections', CollectionSchema);