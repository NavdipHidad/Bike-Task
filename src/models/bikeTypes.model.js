const mongoose = require('mongoose');

const bikeTypeSchema = new mongoose.Schema({
    bikeType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('BikeType', bikeTypeSchema);