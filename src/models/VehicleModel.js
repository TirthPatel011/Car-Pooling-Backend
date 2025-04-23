const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  driverId: { type: String, required: true },
  model: { type: String, required: true },
  licensePlate: { type: String, required: true },
  capacity: { type: Number, required: true },
  color: { type: String }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);