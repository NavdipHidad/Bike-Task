const express = require('express');

const { verifyToken } = require('../../middlewares/auth');

const { httpAddNewBike,
    httpUpdateBike,
    httpDeleteBikeById,
    httpGetAllBikes,
    httpGetBikeByBikeType,
    httpGetRecentBikes,
    httpGetCountOfLikes, } = require('./bike.controller');

const bikeRouter = express.Router();
bikeRouter.post('/addBike', verifyToken, httpAddNewBike);
bikeRouter.patch('/updateBike', verifyToken, httpUpdateBike);
bikeRouter.delete('/deleteBikeById', verifyToken, httpDeleteBikeById);
bikeRouter.get('/getAllBikes', verifyToken, httpGetAllBikes);
bikeRouter.get('/getBikeByBikeType', verifyToken, httpGetBikeByBikeType);
bikeRouter.get('/getRecentBike', verifyToken, httpGetRecentBikes);
bikeRouter.get('/getCountOfLikes', verifyToken, httpGetCountOfLikes);

module.exports = bikeRouter;