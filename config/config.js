const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3300,
        dbURL: 'mongodb://localhost:27017/rest-api'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: "mongodb+srv://cluster0.airlw.mongodb.net/rest-api"
    }
};

module.exports = config[env]