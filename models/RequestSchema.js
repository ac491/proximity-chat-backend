const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    user: String,
    email_address: String,
    owner: String,
    owner_email: String,
    type: String,
    isMatched: Boolean,
    isRejected: Boolean
})

module.exports = mongoose.model('request', requestSchema);