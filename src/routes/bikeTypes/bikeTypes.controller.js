const { registerNewBikeType, getAllBikeTypes } = require('../../service/bikeTypesServices');

async function httpRegisterBikeType(req, res) {
    const bikeTypeDtl = req.body;
    // console.log(bikeTypeDtl.toString());
    console.log("bike-TypeDtl");
    // res.send(bikeTypeDtl);
    return res.status(201).json(await registerNewBikeType(bikeTypeDtl));
}

async function httpGetAllBikeType(req, res) {
    //res.send("Types");
    return res.status(200).json(await getAllBikeTypes());
}

module.exports = {
    httpRegisterBikeType,
    httpGetAllBikeType,
};