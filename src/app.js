const express = require('express');

const usersRouter = require('./routes/users/users.router');
const bikeTypeRouter = require('./routes/bikeTypes/bikeTypes.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', usersRouter);
app.use('/bikeType', bikeTypeRouter);

module.exports = app;