const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function register(req, res, next) {
    const { name, email, username, password, repeatPassword } = req.body;

    return userModel.create({ name, email, username, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            res.cookie(authCookieName, token, { httpOnly: true, sameSite='none' })
                .status(200)
                .send(createdUser);
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409);
                res.send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong username or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            res.cookie(authCookieName, token, { httpOnly: true, sameSite='none' })
                .send(user);
        })
        .catch(next);
}

function logout(req, res) {

    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName);
            res.status(401);
            res.send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

function confirmUser(req, res, next) {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(401)
            .send({ message: 'Unauthorized!' });
    }
}

// function getUserbyId(req, res) {
//     const { _id } = req.body;
//     userModel.findById(_id)
//         .select('-password -__v')
//         .then(user => {
//             // const token = utils.jwt.createToken({ id: 1 });
//             // res.cookie(authCookieName, token, { httpOnly: true, sameSite='none' })
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
    res.cookie(authCookieName, token, { httpOnly: true, sameSite='none' })
    res.send('something')
}

module.exports = {
    login,
    register,
    logout,
    confirmUser,
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