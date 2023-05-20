var admin = require("firebase-admin");
var serviceAccount = require("../configs/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {
    async sendNotification(req, res) {
        let model = req.body;
        let sender_name = model.sender_name;
        let receiver_name = model.receiver_name;
        let sender_email = model.sender_email;
        let receiver_email = model.receiver_email;
        let message = model.message;

        try {

            const messageObj = {
                notification: {
                    title: sender_name,
                    body: message
                },
                android: {
                    notification: {
                        channelId: receiver_email
                    }
                },
                topic: 'chat',
                data: {
                    user_name: sender_name,
                    message: message,
                    user_email_id: sender_email
                }
            };

            admin.messaging().send(messageObj)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                    res.status(200).send({"success":true, "message": "Notification sent successfully"})
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                    res.status(500).send({"success":false, "message": "Error occurred while sending notification"})
                });


        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User"})
        }
    }
}