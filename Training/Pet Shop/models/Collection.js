const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pokemon = require('/models/Pokemon');

// Create Schema
const CollectionSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    auteur: {
        type: String
    },
    list: [{
        type: Pokemon.id
    }]
});

module.exports = Collection = mongoose.model('collection', CollectionSchema);