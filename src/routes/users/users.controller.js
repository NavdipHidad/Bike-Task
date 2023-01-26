const bcrypt = require("bcryptjs");

const usersDB = require("../../models/users.model");
const { registerNewUser } = require("../../service/usersServices");

async function isUserExist(userEmail) {
  const result = await usersDB.findOne({ email: userEmail });
  return result;
}

async function httpRegisterUser(req, res) {
  try {
    const userDtl = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 9),
    };
    if (await isUserExist(userDtl["email"])) {
      return res.status(400).json({
        message: `User with Email-ID '${userDtl.email}' is already exist, Please Login`,
      });
    }

    return res.status(201).json(await registerNewUser(userDtl));
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
}

async function httpGetAllUser(req, res) {
  //res.send()
  return res.status(201).json(await getAllUsers());
}

module.exports = {
  httpRegisterUser,
  httpGetAllUser,
};
