const express = require('express');

const { verifyToken } = require('../../middlewares/auth');

const { httpRegisterUser, httpGetAllUser, httpLoginUser, httpLikeOnBike, httpCommentOnBike } = require('./users.controller');

const usersRouter = express.Router();
usersRouter.post('/register', httpRegisterUser);
usersRouter.get('/getUsers', httpGetAllUser);
usersRouter.post('/loginUser', httpLoginUser);
usersRouter.post('/likeOnBike', verifyToken, httpLikeOnBike);
usersRouter.post('/commentOnBike', verifyToken, httpCommentOnBike);

module.exports = usersRouter;