const express = require('express');

const { httpRegisterBikeType, httpGetAllBikeType } = require('./bikeTypes.controller');

const bikeTypeRouter = express.Router();
bikeTypeRouter.post('/register', httpRegisterBikeType);
bikeTypeRouter.get('/getBikeType', httpGetAllBikeType);
//bikeTpeRouter.get('/getUsers', httpGetAllUser);

module.exports = bikeTypeRouter;