const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokeCollection = require('./Collection');

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    courriel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pokeCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collections",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);