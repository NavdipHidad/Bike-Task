const usersDB = require('../models/users.model');

async function registerNewUser(userDtl) {
    //console.log(userDtl.password);
    if ((!userDtl.firstName) || (!userDtl.lastName) || (!userDtl.email) || (!userDtl.phoneNo)) {
        throw new Error('All required field must not be empty');
    }
    if (!(userDtl.password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
        throw new Error('Password not strong');
    }
    else {
        await usersDB.create(userDtl);
        //console.log(userDtl);
    }
}

module.exports = { registerNewUser }
