const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const hotelSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    "hotel-name": {
        type: String,
        required: true
    },
    "check-in": {
        type: String,
        required: true
    },
    "check-out": {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    notes: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    tripId: {
        type: ObjectId,
        ref: "Trip"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Hotel', hotelSchema);
