const {
  registerNewBikeType,
  getAllBikeTypes,
} = require("../../service/bikeTypesServices");

async function httpRegisterBikeType(req, res) {
  try {
    const bikeTypeDtl = req.body.bikeType;
    if (!bikeTypeDtl) {
      return res.status(400).json({ Error: "Bike type is required." });
    }
    // console.log(bikeTypeDtl.toString());
    //console.log("bike-TypeDtl");
    // res.send(bikeTypeDtl);
    return res.status(201).json(await registerNewBikeType(bikeTypeDtl));
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
}

async function httpGetAllBikeType(req, res) {
  try {
    //console.log('ThI', req.uId);
    return res.status(200).json(await getAllBikeTypes());
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
}

module.exports = {
  httpRegisterBikeType,
  httpGetAllBikeType,
};
