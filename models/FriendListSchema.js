const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: String,
    email_address: String
})

const friendsSchema = new mongoose.Schema({
    email_address: String,
    friendlist: [userSchema]
})

module.exports = mongoose.model('friendList', friendsSchema);