const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_id: String,
    receiver_id: String,
    timestamp: String,
    message: String,
    room: String
})

module.exports = mongoose.model('message', messageSchema);