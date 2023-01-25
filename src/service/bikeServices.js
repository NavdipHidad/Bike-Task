const bikeDB = require('../models/bike.model');
const { getAllBikeTypes } = require('./bikeTypesServices');

async function isBikeTypeValid(bikeType) {
    const bType = await getAllBikeTypes();
    let bTypeArr = [];
    bType.map((typeName) => bTypeArr.push(typeName.bikeType));
    //console.log(bTypeArr.includes(bikeType));
    return (bTypeArr.includes(bikeType));
}

async function getBikeById(bikeId) {
    const result = await bikeDB.findById(bikeId);
    console.log('fetched bike in bService', result);
    if (result) {
        return result;
    } else {
        return false;
    }
}

async function addNewBike(bikeDtl) {
    if ((!bikeDtl.bikeName) || (!bikeDtl.bikeBrand) || (!bikeDtl.bikeType) || (!bikeDtl.bikeEngineType)) {
        throw new Error('All required field must not be empty');
    } else {
        const isTypeValid = await isBikeTypeValid(bikeDtl.bikeType);
        if (!isTypeValid) {
            throw new Error('Selected bike type is not available');
        } else {
            return await bikeDB.create(bikeDtl);
        }
    }
}

async function updateBikeEngineType(updateDtl) {
    const result = await bikeDB.updateOne({ _id: updateDtl.id }, { $set: { bikeEngineType: updateDtl.engType } });
    //return await bikeDB.updateOne({ _id: updateDtl.id }, { $set: { bikeEngineType: updateDtl.engType } });
    if (result["modifiedCount"] === 1) {
        return { message: `Bike with ID '${updateDtl.id}' is updated with Engine-type '${updateDtl.engType}'.` }
    } else {
        return { message: `Bike with ID '${updateDtl.id}' is NOT updated with Engine-type '${updateDtl.engType}'.` }
    }
}

async function deleteBikeById(bikeDtl) {
    //console.log(typeof bikeDtl.id);
    const result = await bikeDB.deleteOne({ _id: bikeDtl.id });
    if (result.affected === 0) {
        return { message: `Bike with ID '${bikeDtl.id}' is not available.` }
    } else {
        return { message: `Bike with ID '${bikeDtl.id}' is deleted successfully.` }
    }
}

async function getAllBikes() {
    return await bikeDB.find({}, {
        '__v': 0
    });
}

async function getBikeByBikeType(bType) {
    const result = await bikeDB.find({ bikeType: bType }, {
        '__v': 0
    });
    if (result.length === 0) {
        return { message: `'${bType}' types of bikes are not available.` }
    } else {
        return result;
    }
}

async function getMostRecentBike() {
    return await bikeDB.findOne().sort({ createdAt: -1 });
}


module.exports = {
    addNewBike,
    updateBikeEngineType,
    deleteBikeById,
    getAllBikes,
    getBikeByBikeType,
    getMostRecentBike,
    getBikeById,
};