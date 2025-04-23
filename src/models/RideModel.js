const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rideId: { type: String, required: true, unique: true },
  driverId: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  dateTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'active' } 
});

module.exports = mongoose.model('Ride', rideSchema);