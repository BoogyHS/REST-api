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
    userId: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Trip', tripSchema);
