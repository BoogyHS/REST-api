const express = require('express');
const router = express.Router();

// middleware that is specific to this router

const data = {
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of React project",
    "main": "index.js",
}

// define the home page route
router.get('/', function (req, res) {
    res.send(data);
})

module.exports = router