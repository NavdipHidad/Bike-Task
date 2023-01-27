const express = require('express');

const { verifyToken } = require('../../middlewares/auth');

const { httpRegisterUser, httpGetAllUser, httpLoginUser, httpLikeOnBike } = require('./users.controller');

const usersRouter = express.Router();
usersRouter.post('/register', httpRegisterUser);
usersRouter.get('/getUsers', httpGetAllUser);
usersRouter.post('/loginUser', httpLoginUser);
usersRouter.post('/likeOnBike', verifyToken, httpLikeOnBike)

module.exports = usersRouter;