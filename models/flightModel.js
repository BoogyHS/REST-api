const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const flightSchema = new mongoose.Schema({
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    "date-time": {
        type: String,
        required: true
    },
    // date: {
    //     type: String,
    //     required: true
    // },
    // time: {
    //     type: String,
    //     required: true
    // },
    price: {
        type: Number
    },
    notes: {
        type: String
    },
    type: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    tripId:{
        type: ObjectId,
        ref: "Trip"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Flight', flightSchema);
