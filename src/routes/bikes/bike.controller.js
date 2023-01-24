const { addNewBike, updateBikeEngineType, deleteBikeById, getAllBikes } = require('../../service/bikeServices');

async function httpAddNewBike(req, res) {
    const bikeDtl = req.body;
    return res.status(201).json(await addNewBike(bikeDtl));
}

async function httpUpdateEngineType(req, res) {
    const updateDtl = req.body;
    //res.send('in update');
    return res.status(200).json(await updateBikeEngineType(updateDtl));
}

async function httpDeleteBikeById(req, res) {
    const bikeId = req.body;
    console.log(bikeId);
    await deleteBikeById(bikeId);
    return res.status(200).json({ message: `Bike with ${bikeId.id} is deleted successfully.` });
}

async function httpGetAllBikes(req, res) {
    return res.status(200).json(await getAllBikes());
}

module.exports = {
    httpAddNewBike,
    httpUpdateEngineType,
    httpDeleteBikeById,
    httpGetAllBikes
};