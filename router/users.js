const express = require('express');
const router = express.Router();
const { authController } = require('../controllers')

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

// router.post('/login', authController.postLogin)

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/user/:username', authController.getUserInfo);
router.put('/edit/:username', authController.editUserInfo);

module.exports = router