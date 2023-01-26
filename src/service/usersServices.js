const bcrypt = require('bcryptjs');

const usersDB = require('../models/users.model');
const { getBikeById } = require('./bikeServices');

async function isUserExist(userEmail) {
    const result = await usersDB.findOne({ email: userEmail });
    //console.log(result);
    if (result) {
        //console.log('this False');
        return false;
    } else {
        //console.log('this True');
        return true;
    }
}

async function registerNewUser(userDtl) {
    //console.log(userDtl.password);
    if ((!userDtl.firstName) || (!userDtl.lastName) || (!userDtl.email) || (!userDtl.phoneNo)) {
        throw new Error('All required field must not be empty');
    }
    else {
        // const isDuplicate = await isUserExist(userDtl['email']);
        // if (isDuplicate) {
        //     //console.log('In true');
        //     userDtl.password = await bcrypt.hash(userDtl.password, 9);
            const result = await usersDB.create(userDtl);
            return result;
        // } else {
        //     return { message: `User with Email-ID '${userDtl.email}' is already exist, Please Login` };
        // }
        //console.log(userDtl);
    }
}


module.exports = {
    registerNewUser,
    //likeToBike
}
