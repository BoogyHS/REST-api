const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const tripSchema = new mongoose.Schema({
    name: {
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
        type: Number,
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    hotelId: {
        type: ObjectId,
        ref: "Hotel"
    },
    flightId: {
        type: ObjectId,
        ref: "Flight"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Trip', tripSchema);
