const express = require('express');

const { httpAddNewBike,
    httpUpdateBikeEngineType,
    httpDeleteBikeById,
    httpGetAllBikes,
    httpGetBikeByBikeType,
    httpGetRecentBikes } = require('./bike.controller');

const bikeRouter = express.Router();
bikeRouter.post('/addBike', httpAddNewBike);
bikeRouter.patch('/updateEngineType', httpUpdateBikeEngineType);
bikeRouter.delete('/deleteBikeById', httpDeleteBikeById);
bikeRouter.get('/getAllBikes', httpGetAllBikes);
bikeRouter.get('/getBikeByBikeType', httpGetBikeByBikeType);
bikeRouter.get('/getRecentBike', httpGetRecentBikes);

module.exports = bikeRouter;