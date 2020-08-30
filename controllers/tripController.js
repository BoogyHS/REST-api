const { tripModel, userModel } = require('../models');

function isValidTrip(startDate, endDate) { return startDate < endDate }

function checkAvailability(newTrip, trips) {

    for (const trip of trips) {

        if ((newTrip.startDate >= trip.startDate && newTrip.startDate <= trip.endDate)
            || (newTrip.endDate > trip.startDate && newTrip.endDate <= trip.endDate)
            || (trip.startDate > newTrip.startDate && trip.endDate < newTrip.endDate)) {
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
        userId: req.body.userId,
        price: 0
    }

    if (isValidTrip(newTrip.startDate, newTrip.endDate)) {

        userModel.findById(newTrip.userId)
            .populate('trips')
            .then(user => {

                if (user) {
                    const trips = JSON.parse(JSON.stringify(user)).trips;
                    const available = checkAvailability(newTrip, trips);

                    if (available) {
                        tripModel.create(newTrip)
                            .then(trip => {
                                tripId = JSON.parse(JSON.stringify(trip))._id;
                                user.trips.push(tripId);
                                user.save();

                                return res.send(trip);
                            });
                    } else {
                        return res
                            .status(400)
                            .send({ message: "You already have trip on these dates" });
                    }
                } else {
                    return res
                        .status(400)
                        .send({ message: "User not found" });
                }
            })
            .catch(err => { res.send(err) });
    } else {
        return res
            .status(400)
            .send({ message: "Invalid trip dates" });
    }
}

function getTrips(req, res, next) {
    const { userId } = req.query;

    userModel.findById(userId)
        .populate({ path: 'trips', options: { sort: { 'startDate': 1 } } })
        .then(user => {
            const trips = JSON.parse(JSON.stringify(user)).trips;
            res.send(trips);
        })
        .catch(err => res.send(err))
}

function getReservations(req, res, next) {
    const { userId, tripId } = req.query;

    tripModel.findById(tripId)
        .populate({ path: 'hotels flights', options: { sort: { 'startDate': 1 } } })
        .then(trip => {
            trip = JSON.parse(JSON.stringify(trip));
            res.send(trip);
        })
        .catch(err => res.send(err))
}

module.exports = {
    createTrip,
    getTrips,
    getReservations
}