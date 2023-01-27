const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretKey4';

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);
    if (!bearerHeader) {
        res.status(400).json({ Error: 'Valid token is required' });
    } else {
        // const bearer = bearerHeader.split(' ');
        // const token = bearer[0];
        //req.token = bearerHeader;

        jwt.verify(bearerHeader, SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(400).json({ Error: 'Invalid token' });
            } else {
                //res.status(200).json({ Message: 'You are authenticated', authData });
                req.uId = authData['uId'];
                console.log(authData['uEmail']);
                console.log('In Midd', req.uId);
                next();
            }
        });
    }
}

module.exports = { verifyToken };