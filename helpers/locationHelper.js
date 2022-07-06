const Location = require('../models/GeoLocationSchema');

module.exports = {
    async createUserLocation(locationObj) {
        try {
            const location = new Location(locationObj);
            await location.save();
        } catch(err) {
            throw err;
        }
    },
    FindMatches() {
        
    }
}