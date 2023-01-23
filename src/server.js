const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const usersDB = require('./models/users.model');
const {registerNewUser} = require('./service/addNewUser');
const app = require('./app');

const PORT = 8000;

//const app = express();
const server = http.createServer(app);

mongoose.set('strictQuery', true);

const MONGO_URL = 'mongodb+srv://nasa-api:hzBN64TME9ZejhKY@nasacluster.thr6kbo.mongodb.net/bike-users?retryWrites=true&w=majority';
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});


const appRout = express.Router();

//app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hey Riders!!');
});

// app.post('/register', async (req, res) => {
//     res.send('ok');
    // const userDtl = req.body;
    // res.send(userDtl.password);
    // console.log(userDtl.password);
    // if ((!userDtl.firstName) || (!userDtl.lastName) || (!userDtl.email) || (!userDtl.phoneNo)) {
    //     throw new Error('All required field must not be empty');
    // }
    // if (!(userDtl.password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
    //     throw new Error('Password not strong');
    // }
    // else {
    //     await usersDB.create(userDtl);
    // }
// });

async function startServer() {
    await mongoose.connect(MONGO_URL);
    //await registerNewUser();

    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}...`);
    });
}


startServer();