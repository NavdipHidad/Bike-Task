const express = require('express');

const { httpRegisterBikeType, httpGetAllBikeType } = require('./bikeTypes.controller');

const bikeTpeRouter = express.Router();
bikeTpeRouter.post('/register', httpRegisterBikeType);
bikeTpeRouter.get('/getBikeType', httpGetAllBikeType);
//bikeTpeRouter.get('/getUsers', httpGetAllUser);

module.exports = bikeTpeRouter;