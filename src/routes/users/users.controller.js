const usersDB = require('../../models/users.model');
const { registerNewUser } = require('../../service/usersServices');

async function httpRegisterUser(req, res) {
    const userDtl = req.body;
    //console.log('cont:-> ',req.body);
    //res.send(userDtl);
    return res.status(201).json(await registerNewUser(userDtl));
}

async function httpGetAllUser(req, res) {

    //res.send()
    return res.status(201).json(await getAllUsers());
}

module.exports = {
    httpRegisterUser,
    httpGetAllUser,
}