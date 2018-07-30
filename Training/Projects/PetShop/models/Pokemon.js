const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PokemonSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Pokemon = mongoose.model('pokemons', PokemonSchema);