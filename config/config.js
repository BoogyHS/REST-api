const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3300,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: 'http://localhost:3000'
    }
};

module.exports = config[env]