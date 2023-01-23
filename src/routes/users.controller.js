const usersDB = require('./../models/users.model');
const {registerNewUser} = require('../service/addNewUser');

async function httpRegisterUser(req, res) {
    const userDtl = req.body;
    //console.log('cont:-> ',req.body);
    res.send(userDtl);
    return res.status(201).json(await registerNewUser(userDtl));
}

module.exports = { httpRegisterUser }