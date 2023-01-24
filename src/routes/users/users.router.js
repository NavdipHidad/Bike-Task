const express = require('express');

const { httpRegisterUser, httpGetAllUser } = require('./users.controller');

const usersRouter = express.Router();
usersRouter.post('/register', httpRegisterUser);
usersRouter.get('/getUsers', httpGetAllUser)

module.exports = usersRouter;