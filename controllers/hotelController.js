const { tripModel, hotelModel } = require('../models');

function addHotel(req, res, next) {

    const hotelData = {
        type: 'hotel',
        ...req.body
    };
    console.log(hotelData)
    hotelModel.create(hotelData)
        .then(hotel => {
            hotel = hotel.toJSON();
            tripModel.findOneAndUpdate({ _id: hotel.tripId.toJSON() }, { $push: { hotels: hotel._id.toJSON() } })
                .populate('hotels flights')
                .then(trip => {
                    res.send(trip);
                })
                .catch(err => console.log(err));
        })
}

module.exports = {
    addHotel,
}