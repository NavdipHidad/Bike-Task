const express = require('express');

const { verifyToken } = require('../../middlewares/auth')

const { httpRegisterBikeType, httpGetAllBikeType } = require('./bikeTypes.controller');

const bikeTypeRouter = express.Router();
bikeTypeRouter.post('/addBikeType', verifyToken, httpRegisterBikeType);
bikeTypeRouter.get('/getBikeType', verifyToken, httpGetAllBikeType);
//bikeTpeRouter.get('/getUsers', httpGetAllUser);

module.exports = bikeTypeRouter;