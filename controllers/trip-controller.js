const { tripModel, userModel } = require('../models');

function isValidTrip(startDate, endDate) { return startDate < endDate }

function checkAvailability(newTrip, trips) {
    for (const trip of trips) {
        if (newTrip.startDate > trip.startDate && newTrip.startDate < trip.endDate
            || newTrip.endDate > trip.startDate) {
            return false;
        }
    }
    return true;
}

function createTrip(req, res, next) {

    const newTrip = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        userId: req.body.userId
    }

    if (isValidTrip(newTrip.startDate, newTrip.endDate)) {

        userModel.findById(newTrip.userId)
            .populate('trips')
            .then(user => {

                if (user) {
                    const trips = JSON.parse(JSON.stringify(user)).trips;
                    const available = checkAvailability(newTrip, trips);

                    if (available) {
                        // console.log(trips)
                        tripModel.create(newTrip)
                            .then(trip => {
                                tripId = JSON.parse(JSON.stringify(trip))._id;
                                user.trips.push(tripId);
                                user.save();

                                res.send(trip);
                            })
                    }
                    return res.send({ message: "You already have trip on these dates" })
                }
                return res.send({ message: "User not found" })
            })
            .catch(err => { res.send(err) })
    }
    return res.send({ message: "Invalid trip dates" })
}

module.exports = {
    createTrip
}