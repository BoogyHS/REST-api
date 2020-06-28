const express = require('express');
const router = express.Router();
const { authController } = require('../controllers')

// middleware that is specific to this router

// define the home page route
router.get('/login', function (req, res) {
  res.send('login page')
})

router.post('/login', authController.postLogin)
router.post('/register', authController.postRegister)

module.exports = router