const express = require('express');

const { httpRegisterUser } = require('./users.controller');

const usersRouter = express.Router();
usersRouter.post('/register', httpRegisterUser);

module.exports = usersRouter;