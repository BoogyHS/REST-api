const express = require('express');
const router = express.Router();
const { tripController } = require('../controllers');
const { auth } = require('../utils');

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

router.post('/new-trip', auth(), tripController.createTrip);
router.get('/my-trips', auth(), tripController.getTrips);

module.exports = router