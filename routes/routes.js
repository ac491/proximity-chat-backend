const express = require("express");
const router = express.Router();
const locationController = require('../controllers/locationController');
const requestController = require('../controllers/requestController');
const messageController = require('../controllers/messageController');

let routes = app => {

    router.post("/addLocation", (req, res) => {
        try {
            locationController.addLocation(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating event", "data": []})
        }
    });

    router.post("/addRequest", (req, res) => {
        try {
            requestController.addRequest(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating request", "data": []})
        }
    });

    router.post("/listRequests", (req, res) => {
        try {
            requestController.listRequests(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while creating request", "data": []})
        }
    });

    router.post("/acceptRequest", (req, res) => {
        try {
            requestController.acceptRequest(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while accepting request", "data": []})
        }
    });

    router.post("/listFriends", (req, res) => {
        try {
            requestController.listFriends(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while accepting request", "data": []})
        }
    });

    router.post("/listMessages", (req, res) => {
        try {
            messageController.listMessages(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({"success":false, "message": "Error occurred while accepting request", "data": []})
        }
    });

    return app.use("/", router);
};

module.exports = routes;