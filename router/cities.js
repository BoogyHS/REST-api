const express = require('express');
const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get('/city', function (req, res) {
  res.send('city page')
})

// console.log('test')
module.exports = router