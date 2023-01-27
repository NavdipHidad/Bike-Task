const bcrypt = require('bcryptjs');

const usersDB = require('../models/users.model');
const bikeDB = require('../models/bike.model');
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

async function loginUser(userDtl) {
    if (isUserExist(userDtl.uEmail)) {
        //console.log(userDtl.uEmail);
        //console.log(await usersDB.findOne({ email: userDtl.email }, { password: 1 }));
        const result = await usersDB.findOne({ email: userDtl.uEmail }, { password: 1, _id: 0 });
        console.log(result.password, '\n', userDtl.uPassword);
        if (result.password === userDtl.uPassword) {
            //console.log(result);
            return true;
        } else {
            return false;
        }
        // }
    }
}

async function registerNewUser(userDtl) {
    //console.log(userDtl.password);
    if ((!userDtl.firstName) || (!userDtl.lastName) || (!userDtl.email) || (!userDtl.phoneNo)
        || (!userDtl.password)) {
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

async function likeOnBike(likeDtl) {
    const result = await bikeDB.findOne({ _id: likeDtl.bikeId }, { likedByUserId: 1, _id: 0 });
    (result.likedByUserId).push(likeDtl.bikeId);
    const updateArray = await bikeDB.updateOne({ _id: likeDtl.bikeId }, { likedByUserId: result.likedByUserId });
    return updateArray;
}

module.exports = {
    registerNewUser,
    loginUser,
    likeOnBike,
}
