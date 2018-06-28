const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = Pokemon = mongoose.model('pokemon', PokemonSchema);