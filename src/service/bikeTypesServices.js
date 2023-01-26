const bikeTypeDB = require('../models/bikeTypes.model');

async function registerNewBikeType(bTypeDtl) {
    if (bTypeDtl) {
        bikeTypeDB.create({bikeType: bTypeDtl});
    }
    else {
        throw new Error('Bike-type must be specify');
    }
}

async function getAllBikeTypes() {
    return await bikeTypeDB.find({}, {
        '__v': 0
    });
}

module.exports = {
    registerNewBikeType,
    getAllBikeTypes,
};