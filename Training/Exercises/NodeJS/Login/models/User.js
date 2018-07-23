const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
var User = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', User);