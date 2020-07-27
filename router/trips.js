const express = require('express');
const router = express.Router();
const { tripController } = require('../controllers')

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

router.post('/new-trip', tripController.createTrip);

module.exports = router