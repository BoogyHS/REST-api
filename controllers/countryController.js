const { countryModel } = require('../models');
const countries = require('../countries');

function getCountries(req, res, next) {
    countryModel.find()
        .select('name')
        .then(data => {
            res.send(data);
        })
}

function postCountries(req, res, next) {
    countries.forEach(el => {
        countryModel.create({ ...el })
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    })
    console.log(countries)
}

module.exports = {
    getCountries,
    postCountries
}