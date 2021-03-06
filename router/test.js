const express = require('express');
const router = express.Router();
const utils = require('../utils')

// middleware that is specific to this router

const data = {
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of React project",
    "main": "index.js",
}
//testing little change
// define the home page route
router.get('/', function (req, res) {

    const token = utils.jwt.createToken({ id: 'test' });

    res.cookie('test-cookie', token, { httpOnly: true });
    res.send(data);
})

module.exports = router