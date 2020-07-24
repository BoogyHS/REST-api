const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

function login(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.send({ message: 'Wrong username or password' });
                return
            }

            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(authCookieName, token, { httpOnly: true })
                .status(200)
                .send(user);
        })
        .catch(next);
}

function register(req, res, next) {
    const { name, email, username, password, repeatPassword } = req.body;
    // console.log(req)
    // if (password !== repeatPassword) {
    //     res.render('register', { errors: { password: 'Password do not match' } });
    //     return;
    // }
    // userModel.findOne({ username })
    //     .then(user => {
    //         if (user) {
    //             res.render('register.hbs', { errors: { username: 'Username is already registered' } });
    //             return;
    //         }
    //     }
    //тествам нещо
    return userModel.create({ name, email, username, password })
        .then((createdUser) => {
            const { password, ...createdUserData } = createdUser;

            const token = utils.jwt.createToken({ id: 'something' });
            // res.header('Access-Control-Allow-Origin', "*");
            res.cookie(authCookieName, token, { httpOnly: true })
                .status(200)
                .send({ createdUserData });
            // console.log(res._event, 'from rest-api' )
            // res.something = 'something';
            // res.send('/login');
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409);
                res.send({ errors: { username: 'Username is already registered!' } });
                return;
            }
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[authCookieName];
    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName);
            res.status(401);
        })
        .catch(err => res.send(err));
}

// function getUserbyId(req, res) {
//     const { _id } = req.body;
//     userModel.findById(_id)
//         .select('-password -__v')
//         .then(user => {
//             // const token = utils.jwt.createToken({ id: 1 });
//             // res.cookie(authCookieName, token, { httpOnly: true })
//             res.send(user)
//         })
//         .catch(err => { res.send(err) });
// }

function getUserInfo(req, res) {
    const { username } = req.params;

    userModel.findOne({ username })
        .select('-password __v')
        .then(user => {
            res.send(user)
        })
        .catch(err => res.send(err));

}

function editUserInfo(req, res) {
    // const { username } = req.params;
    // const token = req.cookies[authCookieName];
    console.log('TODO edituserinfo')
}

function test(reg, res) {
    const token = utils.jwt.createToken({ id: 123 });
    res.cookie(authCookieName, token, { httpOnly: true })
    res.send('something')
}

module.exports = {
    login,
    register,
    logout,
    test,
    getUserInfo,
    editUserInfo,
}

// fetch('http://localhost:3000/api/users/register', {
//     method: 'post',
//     header: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//         username: 12345,
//         password: 12345, repeatPassword: 12345
//     })
// }).then(console.log)