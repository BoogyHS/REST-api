const { tripModel, flightModel } = require('../models');

function addFlight(req, res, next) {
    const flightData = {
        type: 'flight',
        ...req.body
    };

    flightModel.create(flightData)
        .then(flight => {
            flight = flight.toJSON();
            tripModel.findOneAndUpdate(
                { _id: flight.tripId.toJSON() },
                {
                    $push: { flights: flight._id.toJSON() },
                    $inc: { "price": flightData.price }
                })
                .populate('hotels flights')
                .then(trip => {
                    res.send(trip);
                })
                .catch(err => console.log(err));
        })
}

module.exports = {
    addFlight,
}