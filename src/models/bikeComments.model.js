const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    uId: {
        type: String,
        required: true,
    },
    bikeId: {
        type: String,
        required: true,
    },
    comment: {
        type: [String],
        required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model('BikeComments', commentSchema);