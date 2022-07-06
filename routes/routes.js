const express = require("express");
const router = express.Router();
const locationController = require('../controllers/locationController');

let routes = app => {

    router.post("/addLocation", (req, res) => {
        try {
            locationController.addLocation(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating event", "data": []})
        }
    });

    return app.use("/", router);
};

module.exports = routes;