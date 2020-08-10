const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { tripController } = require('../controllers');
const { hotelController } = require('../controllers');
const { flightController } = require('../controllers');

// middleware that is specific to this router

// define the home page route
// router.get('/login', function (req, res) {
//   res.send('login page')
// })

router.post('/new-trip', auth(), tripController.createTrip);
router.get('/my-trips', auth(), tripController.getTrips);
router.get('/my-trips/:id/reservations', auth(), tripController.getReservations);
router.post('/add-hotel', auth(), hotelController.bookHotel);
router.post('/add-flight', auth(), flightController.bookFlight);

module.exports = router