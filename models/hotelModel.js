const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tripSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
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
    tripId:{
        type: ObjectId,
        ref: "Trip"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Hotel', hotelSchema);