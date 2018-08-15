const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const tradeSchema = new Schema({
    username: {
        type: String,
    },
    ask: [{
        type: String
    }],
    choose: [{
        type: String
    }],
    from: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = tradeCollection = mongoose.model('trade', tradeSchema);