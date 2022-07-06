let locationHelper = require('../helpers/locationHelper');

module.exports = {
    async addLocation(req, res) {

        let model = req.body;
        let user_name = model.user_name;
        let longitude = model.longitude;
        let latitude = model.latitude;

        try {

            await locationHelper.createUserLocation(
                {
                    user_name: user_name,
                    location: {
                        "type": "Point",
                        "coordinates": [
                            latitude,
                            longitude
                        ]
                    }
                }
            )
            res.send({"success":true, "message": "User successsfully created"})
            res.end();

        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating User"})
        }


    },
}