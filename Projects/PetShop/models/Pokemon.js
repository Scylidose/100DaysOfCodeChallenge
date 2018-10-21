const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PokemonSchema = new Schema({
    usernames: [{
        user: {
            type: String
        }
    }],
    name: {
        type: String,
        required: true
    }
});

module.exports = Pokemon = mongoose.model('pokemons', PokemonSchema);