const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3300,
        dbURL: 'mongodb://localhost:27017/rest-api',
        origin: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: "mongodb+srv://boogy:131311@cluster0.airlw.mongodb.net/rest-api?retryWrites=true&w=majority",
        origin: 'https://arcane-retreat-44164.herokuapp.com'
    }
};

module.exports = config[env]