const { tripModel, userModel, hotelModel } = require('../models');

function addHotel(req, res, next) {
    const hotelData = req.body;

    hotelModel.create(hotelData)
        .then(hotel => {
            hotel = hotel.toJSON();
            tripModel.findOneAndUpdate({ _id: hotel.tripId.toJSON() }, { $push: { hotels: hotel._id.toJSON() } })
                .populate('hotels')
                .then(trip => {
                    res.send(trip);
                })
                .catch(err => console.log(err));
        })
}

module.exports = {
    addHotel,
}