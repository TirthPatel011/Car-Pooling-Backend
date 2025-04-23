// models/BookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String, 
        required: true,
        unique: true
    },
    rideId: {
        type: String, 
        required: true,
        ref: 'Ride' // References Ride model
    },
    passengerId: {
        type: String, 
        required: true,
        ref: 'User' // Assuming there's a User model
    },
    seatsBooked: {
        type: Number,
        required: true 
    }, 
    totalFare: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);