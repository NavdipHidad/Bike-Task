const bikeDB = require('../models/bike.model');
const { getAllBikeTypes } = require('./bikeTypesServices');

async function isBikeTypeValid(bikeType) {
    const bType = await getAllBikeTypes();
    let bTypeArr = [];
    bType.map((typeName) => bTypeArr.push(typeName.bikeType));
    //console.log(bTypeArr.includes(bikeType));
    return (bTypeArr.includes(bikeType));
}

async function addNewBike(bikeDtl) {
    if ((!bikeDtl.bikeName) || (!bikeDtl.bikeBrand) || (!bikeDtl.bikeType) || (!bikeDtl.bikeEngineType)) {
        throw new Error('All required field must not be empty');
    } else {
        const isTypeValid = await isBikeTypeValid(bikeDtl.bikeType);
        if (!isTypeValid) {
            throw new Error('Selected bike type is not available');
        } else {
            await bikeDB.create(bikeDtl);
        }
    }
}

async function updateBikeEngineType(updateDtl) {
    return await bikeDB.updateOne({ _id: updateDtl.id }, { $set: { bikeEngineType: updateDtl.engType } });
}

async function deleteBikeById(bikeDtl) {
    console.log(typeof bikeDtl.id);
    return await bikeDB.deleteOne({ _id: bikeDtl.id });
}

async function getAllBikes() {
    return await bikeDB.find({}, {
        '__v': 0
    });
}

module.exports = {
    addNewBike,
    updateBikeEngineType,
    deleteBikeById,
    getAllBikes,
};