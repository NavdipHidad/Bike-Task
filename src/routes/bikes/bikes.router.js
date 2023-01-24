const express = require('express');

const { httpAddNewBike, httpUpdateEngineType, httpDeleteBikeById, httpGetAllBikes } = require('./bike.controller');

const bikeRouter = express.Router();
bikeRouter.post('/addBike', httpAddNewBike);
bikeRouter.patch('/updateEngineType', httpUpdateEngineType);
bikeRouter.delete('/deleteBikeById', httpDeleteBikeById);
bikeRouter.get('/getAllBikes', httpGetAllBikes);

module.exports = bikeRouter;