const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    bikeName: {
        type: String,
        required: true,
    },
    bikeBrand: {
        type: String,
        required: true,
    },
    bikeType: {
        type: String,
        required: true,
    },
    bikeEngineType: {
        type: String,
        required: true,
    },
    likedByUserId: [String],
},
    { timestamps: true }
);

module.exports = mongoose.model('Bike', bikeSchema);