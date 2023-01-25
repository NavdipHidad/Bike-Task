const { addNewBike,
    updateBikeEngineType,
    deleteBikeById,
    getAllBikes,
    getBikeByBikeType,
    getMostRecentBike } = require('../../service/bikeServices');

async function httpAddNewBike(req, res) {
    const bikeDtl = req.body;
    return res.status(201).json(await addNewBike(bikeDtl));
}

async function httpUpdateBikeEngineType(req, res) {
    const updateDtl = req.body;
    //res.send('in update');
    return res.status(200).json(await updateBikeEngineType(updateDtl));
}

async function httpDeleteBikeById(req, res) {
    const bikeId = req.body;
    //console.log(bikeId);
    return res.status(200).json(await deleteBikeById(bikeId));
}

async function httpGetAllBikes(req, res) {
    return res.status(200).json(await getAllBikes());
}

async function httpGetBikeByBikeType(req, res) {
    const bikeType = (req.body).bikeType;
    return res.status(200).json(await getBikeByBikeType(bikeType));
}

async function httpGetRecentBikes(req, res) {
    return res.status(201).json(await getMostRecentBike());
}

module.exports = {
    httpAddNewBike,
    httpUpdateBikeEngineType,
    httpDeleteBikeById,
    httpGetAllBikes,
    httpGetBikeByBikeType,
    httpGetRecentBikes,
};