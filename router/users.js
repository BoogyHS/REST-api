const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

// router.post('/login', authController.postLogin)

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/confirm-user', auth(false), authController.confirmUser);
router.get('/user/:id', authController.getUserInfo);
router.put('/edit/:id', authController.editUserInfo);

router.get('/test', authController.test)

module.exports = router