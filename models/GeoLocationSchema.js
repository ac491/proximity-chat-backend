const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user_name: String,
    email_address: String,
    user_id: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        }
    }
})

locationSchema.index({location: '2dsphere'});


module.exports = mongoose.model('location', locationSchema);