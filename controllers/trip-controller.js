const { tripModel } = require('../models');

function createTrip(req, res, next) {
    console.log(req.body);

    const { name, startDate, endDate, userId } = req.body;
    //TODO: functionality for checking if dates are available
    //TODO: functionality for push the tripID in usercollection

    return tripModel.create({ name, startDate, endDate, userId })
        .then(createdTrip=>{
            res.json({createdTrip})
        })
        .catch(next)
}

module.exports = {
    createTrip
}