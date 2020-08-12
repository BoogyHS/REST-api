const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    iso3: {
        type: String
    },
    iso2: {
        type: String
    },
    "phone_code": {
        type: String
    },
    "capital": {
        type: String
    },
    "currency": {
        type: String
    },
});

module.exports = mongoose.model('Country', countrySchema);
