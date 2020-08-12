const express = require('express');
const router = express.Router();
const { countryController } = require('../controllers');

// middleware that is specific to this router

// define the home page route
router.get('/country', function (req, res) {
  res.send('todo return a selected country')
})

router.get('/allCountries', countryController.getCountries);

router.post('/allCountries', countryController.postCountries);

// console.log('test')
module.exports = router