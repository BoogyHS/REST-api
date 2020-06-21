const express = require('express');
const router = express.Router();

// middleware that is specific to this router

// define the home page route
router.get('/login', function (req, res) {
  res.send('login page')
})

module.exports = router