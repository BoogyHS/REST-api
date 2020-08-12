const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const flightSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
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

module.exports = mongoose.model('Flight', flightSchema);
