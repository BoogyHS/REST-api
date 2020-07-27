const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET;

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));
    
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    
    app.set('view engine', '.hbs');

    app.use(express.static(path.resolve(__basedir, 'static')));
};