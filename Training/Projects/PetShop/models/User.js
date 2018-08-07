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
    trade: [{
        ask: [{
            type: String
        }],
        want: [{
            type: String
        }],
        from: {
            type: String
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);