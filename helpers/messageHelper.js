const Message = require('../models/MessageSchema');

module.exports = {
    async listMessages(room_id) {
        try {

            let messages = await Message.find({"room": room_id});
            return messages;

        } catch(err) {
            throw err;
        }
    },
}