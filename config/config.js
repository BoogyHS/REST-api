const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3300,
        dbURL: 'mongodb://localhost:27017/rest-api'
    },
    production: {}
};

module.exports = config[env]