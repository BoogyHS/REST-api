const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3300,
        dbURL: 'mongodb://localhost:27017/rest-api',
        origin: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['https://react-travel-organizer.herokuapp.com', 'http://react-travel-organizer.s3-website.eu-central-1.amazonaws.com']
    }
};


module.exports = config[env]