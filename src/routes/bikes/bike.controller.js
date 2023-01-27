const bikeDB = require("../../models/bike.model");

const {
  addNewBike,
  updateBike,
  deleteBikeById,
  getAllBikes,
  getBikeByBikeType,
  getMostRecentBike,
  getCountOfLikes,
} = require("../../service/bikeServices");

const { getAllBikeTypes } = require("../../service/bikeTypesServices");

async function isBikeTypeValid(bikeType) {
  const bType = await getAllBikeTypes();
  let bTypeArr = [];
  bType.map((typeName) => bTypeArr.push(typeName.bikeType));
  //console.log(bTypeArr.includes(bikeType));
  return bTypeArr.includes(bikeType);
}

async function httpAddNewBike(req, res) {
  try {
    const bikeDtl = {
      bikeName: req.body.bikeName,
      bikeBrand: req.body.bikeBrand,
      bikeType: req.body.bikeType,
      bikeEngineType: req.body.bikeEngineType,
      //likedByUserId: req.body.likedByUserId,
    };
    const isTypeValid = await isBikeTypeValid(bikeDtl.bikeType);
    if (!isTypeValid) {
      return res
        .status(400)
        .json({ Errror: "Selected bike type is not available" });
    } else {
      return res.status(201).json(await addNewBike(bikeDtl));
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
}

async function httpUpdateBike(req, res) {
  try {
    const updateDtl = {
      bId: req.body.bId,
      bikeName: req.body.bikeName,
      bikeBrand: req.body.bikeBrand,
      bikeType: req.body.bikeType,
      bikeEngineType: req.body.bikeEngineType,
    };
    const isTypeValid = await isBikeTypeValid(updateDtl.bikeType);
    if (
      !updateDtl.bId ||
      !updateDtl.bikeName ||
      !updateDtl.bikeBrand ||
      !updateDtl.bikeType ||
      !updateDtl.bikeEngineType
    ) {
      return res.status(400).json({ Errror: "All fields are required" });
    }
    if (!isTypeValid) {
      return res
        .status(400)
        .json({ Errror: "Selected bike type is not available" });
    }
    return res.status(200).json(await updateBike(updateDtl));
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

async function httpDeleteBikeById(req, res) {
  try {
    const bikeId = (req.body).bId;
    if (!bikeId) {
      return res.status(400).json({ Error: "BikeID is required" });
    }
    return res.status(200).json(await deleteBikeById(bikeId));
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

async function httpGetAllBikes(req, res) {
  try {
    return res.status(200).json(await getAllBikes());
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

async function httpGetBikeByBikeType(req, res) {
  try {
    const bikeType = req.body.bikeType;
    if (!bikeType) {
      return res.status(400).json({ Errror: "Bike type is required" });
    }
    if (!isBikeTypeValid(bikeType)) {
      return res.status(400).json({ Errror: "Bike type is not valid" });
    }
    return res.status(200).json(await getBikeByBikeType(bikeType));
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

async function httpGetRecentBikes(req, res) {
  try {
    return res.status(201).json(await getMostRecentBike());
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

async function httpGetCountOfLikes(req, res) {
  try {
    bikeDtl = {
      bId: req.body.bId,
    };
    return res.status(201).json(await getCountOfLikes(bikeDtl));
  } catch (error) {
    return res.status(400).json({ Errror: error });
  }
}

module.exports = {
  httpAddNewBike,
  httpUpdateBike,
  httpDeleteBikeById,
  httpGetAllBikes,
  httpGetBikeByBikeType,
  httpGetRecentBikes,
  httpGetCountOfLikes,
};
