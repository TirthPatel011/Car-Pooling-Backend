const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  rideId: { type: String, required: true, ref: 'Ride' },
  passengerId: { type: String, required: true, ref: 'User' },
  driverId: { type: String, required: true, ref: 'User' },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  seatsRequested: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('RideRequest', rideRequestSchema);