const jwt = require('jsonwebtoken');
const config = require('../../config/authConfig');

function handleToken(req, res, next) {
    const token = req.headers['access-token'];
    if (!token) {
        next();
    } else {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err)
                return res.status(500).send({message: 'Failed to authenticate token.'});
            req.userId = decoded.id;
            next();
        });
    }
}
module.exports = handleToken;