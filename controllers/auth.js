const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

// function login(req, res) {
//     res.render('login');
// }

// function postLogin(req, res, next) {
//     const { username, password } = req.body;
//     userModel.findOne({ username })
//         .then(user => {
//             return Promise.all([user, user ? user.matchPassword(password) : false]);
//         })
//         .then(([user, match]) => {
//             if (!match) {
//                 res.render('login', { message: 'Wrong username or password' });
//                 return
//             }
//             const token = utils.jwt.createToken({ id: user._id });
//             res.isLogged = true;
//             res.cookie(authCookieName, token)
//             res.redirect('/');
//         })
//         .catch(next);

// }

function getRegister(req, res) {
    userModel.find()
    .select('-password -__v')
        .then(users => {
            const token = utils.jwt.createToken({ id: 1 });
            res.cookie(authCookieName, token, { httpOnly: true })
            res.send(users)
        })
        .catch(console.log)
}

function postRegister(req, res, next) {
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
    return userModel.create({ name, email, username, password })
        .then((createdUser) => {
            const {password, ...createdUserData}= createdUser;

            const token = utils.jwt.createToken({ id: createdUserData.id });
            res.cookie(authCookieName, token, { httpOnly: true })
                .status(200)
                .send({ createdUserData });;
            // console.log(res._event, 'from rest-api' )
            // res.something = 'something';
            // res.send('/login');
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.send({ errors: { username: 'Username is already registered' } });
                return;
            }
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[authCookieName];
    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .redirect('/');
        });
}

module.exports = {
    // login,
    // register,
    // postLogin,
    getRegister,
    postRegister,
    logout
}

// fetch('http://localhost:3000/api/users/register', {
//     method: 'post',
//     header: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//         username: 12345,
//         password: 12345, repeatPassword: 12345
//     })
// }).then(console.log)