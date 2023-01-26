const express = require('express');

const { httpAddNewBike,
    httpUpdateBike,
    httpDeleteBikeById,
    httpGetAllBikes,
    httpGetBikeByBikeType,
    httpGetRecentBikes } = require('./bike.controller');

const bikeRouter = express.Router();
bikeRouter.post('/addBike', httpAddNewBike);
bikeRouter.patch('/updateBike', httpUpdateBike);
bikeRouter.delete('/deleteBikeById', httpDeleteBikeById);
bikeRouter.get('/getAllBikes', httpGetAllBikes);
bikeRouter.get('/getBikeByBikeType', httpGetBikeByBikeType);
bikeRouter.get('/getRecentBike', httpGetRecentBikes);

module.exports = bikeRouter;