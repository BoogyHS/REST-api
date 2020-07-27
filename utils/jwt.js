const jwt = require('jsonwebtoken');
const secret = process.env.secret

function createToken(data) {
    console.log(secret)
    return jwt.sign(data, secret, { expiresIn: '60m' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}