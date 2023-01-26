const bikeDB = require("../models/bike.model");
const { getAllBikeTypes } = require("./bikeTypesServices");

async function getBikeById(bikeId) {
  const result = await bikeDB.findById(bikeId);
  console.log("fetched bike in bService", result);
  if (result) {
    return result;
  } else {
    return false;
  }
}

async function addNewBike(bikeDtl) {
  // if ((!bikeDtl.bikeName) || (!bikeDtl.bikeBrand) || (!bikeDtl.bikeType) || (!bikeDtl.bikeEngineType)) {
  //     throw new Error('All required field must not be empty');
  // } else {

  return await bikeDB.create(bikeDtl);

  // }
}

async function updateBike(updateDtl) {
  const result = await bikeDB.updateOne(
    { _id: updateDtl.bId },
    {
      $set: {
        bikeName: updateDtl.bikeName,
        bikeBrand: updateDtl.bikeBrand,
        bikeType: updateDtl.bikeType,
        bikeEngineType: updateDtl.bikeEngineType,
      },
    }
  );
  //return await bikeDB.updateOne({ _id: updateDtl.id }, { $set: { bikeEngineType: updateDtl.engType } });
  if (result["modifiedCount"] === 1) {
    return {
      message: `Bike with ID '${updateDtl.id}' is updated.`,
    };
  } else {
    return {
      message: `Bike with ID '${updateDtl.id}' is NOT updated.`,
    };
  }
}

async function deleteBikeById(bId) {
  //console.log(typeof bikeDtl.id);
  const result = await bikeDB.deleteOne({ _id: bId });
  if (result.affected === 0) {
    return { message: `Bike with ID '${bId}' is not available.` };
  } else {
    return { message: `Bike with ID '${bId}' is deleted successfully.` };
  }
}

async function getAllBikes() {
  return await bikeDB.find(
    {},
    {
      __v: 0,
    }
  );
}

async function getBikeByBikeType(bType) {
  const result = await bikeDB.find(
    { bikeType: bType },
    {
      __v: 0,
    }
  );
  if (result.length === 0) {
    return { message: `'${bType}' types of bikes are not available.` };
  } else {
    return result;
  }
}

async function getMostRecentBike() {
  return await bikeDB.findOne().sort({ createdAt: -1 });
}

module.exports = {
  addNewBike,
  updateBike,
  deleteBikeById,
  getAllBikes,
  getBikeByBikeType,
  getMostRecentBike,
  getBikeById,
};
