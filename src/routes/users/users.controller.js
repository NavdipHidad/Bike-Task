const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersDB = require("../../models/users.model");
const { registerNewUser, likeOnBike, commentOnBike } = require("../../service/usersServices");

const SECRET_KEY = 'secretKey4';

async function isUserExist(userEmail) {
	const result = await usersDB.findOne({ email: userEmail });
	//console.log(result);
	return result; //will return 1 document or null 
}

async function httpLoginUser(req, res) {
	try {
		const userDtl = {
			uEmail: req.body.uEmail,
			uPassword: req.body.uPassword,
		};

		if ((!userDtl.uEmail) || (!userDtl.uPassword)) {
			return res.status(400).json({ Error: 'Username and password are required.' });
		}

		const result = await isUserExist(userDtl.uEmail);
		if (result === null) {
			return res.status(400).json({ message: 'Unauthorized user, please register your self' });
		}

		const hashedPass = (await isUserExist(userDtl.uEmail))['password'];
		const loggedUserId = (await isUserExist(userDtl.uEmail))['_id'];
		console.log('result is: ', loggedUserId);
		if (await bcrypt.compare(userDtl.uPassword, hashedPass)) {
			jwt.sign({ uEmail: userDtl.uEmail, uId: loggedUserId }, SECRET_KEY, { expiresIn: 60 * 60 }, (err, token) => {
				return res.status(200).json({ message: 'Login Successfully', token: token });
			});
		} else {
			return res.status(400).json({ message: 'Unauthorized user, please register your self' });
		}
	} catch (error) {
		return res.status(500).json({ Error: error });
	}
}

async function httpRegisterUser(req, res) {
	try {
		const userDtl = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNo: req.body.phoneNo,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10),
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

async function httpLikeOnBike(req, res) {
	try {
		const likeDtl = {
			userId: req.uId,
			bikeId: req.body.bId,
		};
		console.log('In Ctr ', likeDtl.userId);
		return res.status(201).json(await likeOnBike(likeDtl));
	} catch (error) {
		return res.status(500).json({ Error: error });
	}
}

async function httpGetAllUser(req, res) {
	//res.send()
	return res.status(201).json(await getAllUsers());
}

async function httpCommentOnBike(req, res){
	try{
		console.log('In Cont', req.uId);
		const commentDtl = {
			userId: req.uId,
			bikeId: req.body.bikeId,
			comment: req.body.comment
		}
		return res.status(201).json(await commentOnBike(commentDtl));
	} catch (error) {
		return res.status(500).json({ Error: error });
	}
}

module.exports = {
	httpRegisterUser,
	httpGetAllUser,
	httpLoginUser,
	httpLikeOnBike,
	httpCommentOnBike,
};
