const messageHelper = require('../helpers/messageHelper');

module.exports = {

    async listMessages(req, res) {
        let model = req.body;
        let room = model.room;

        try {
            let messages = await messageHelper.listMessages(room);

            res.send({"success":true, "message": "messages successsfully fetched", "data": messages})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while fetching messages", "data": []})
        }
    }

}