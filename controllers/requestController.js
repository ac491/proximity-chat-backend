const requestHelper = require('../helpers/requestHelper');

module.exports = {
    async addRequest(req, res) {
        let model = req.body;
        let sender_name = model.sender_name;
        let receiver_name = model.receiver_name;
        let sender_email = model.sender_email;
        let receiver_email = model.receiver_email;

        try {

            await requestHelper.createRequest(
                {
                    user: receiver_name,
                    email_address: receiver_email,
                    owner: sender_name,
                    owner_email: sender_email,
                    type: "sent",
                    isMatched: false,
                    isRejected: false
                },
                {
                    user: sender_name,
                    email_address: sender_email,
                    owner: receiver_name,
                    owner_email: receiver_email,
                    type: "receive",
                    isMatched: false,
                    isRejected: false
                },
            )
            res.send({"success":true, "message": "Requests successsfully created"})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User"})
        }

    },

    async listRequests(req, res) {
        let model = req.body;
        let user_id = model.user_id;

        try {
            let requests = await requestHelper.listRequests(user_id);

            res.send({"success":true, "message": "Requests successsfully created", "data": requests})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User", "data": []})
        }
    },

    async acceptRequest(req, res) {
        let model = req.body;
        let sender_name = model.sender_name;
        let receiver_name = model.receiver_name;
        let sender_email = model.sender_email;
        let receiver_email = model.receiver_email;

        try {

            await requestHelper.addFriend(
                {
                    user_name: receiver_name,
                    email_address: receiver_email
                },
                {
                    user_name: sender_name,
                    email_address: sender_email
                },
            )
            res.send({"success":true, "message": "friend added created"})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User"})
        }

    },

    async listFriends(req, res) {
        let model = req.body;
        let email_address = model.email_address;

        try {
            let friends = await requestHelper.listFriends(email_address);

            res.send({"success":true, "message": "Friends successsfully fetched", "data": friends})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User", "data": []})
        }
    },
}