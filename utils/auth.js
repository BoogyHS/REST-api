const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {

    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';
        Promise.all([
            jwt.verifyToken(token),
            tokenBlacklistModel.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('blacklisted token'));
                }
                userModel.findById(data.id)
                    .select('-password __v')
                    .populate('trips')
                    .then(user => {
                        req.user = user;
                        req.isLogged = true;
                        next();
                    })
            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    console.error(err);
                    res.redirect('/login');
                    return;
                }
                next(err);
            });
    }
}

module.exports = auth;
