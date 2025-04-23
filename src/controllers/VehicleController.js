const Vehicle = require('../models/VehicleModel');
const { v4: uuidv4 } = require('uuid');

// Add a new vehicle
const addVehicle = async (req, res) => {
  try {
    const vehicleData = { ...req.body, vehicleId: uuidv4() };
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get vehicle details for a driver
const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ driverId: req.query.driverId });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this to update a vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const updatedData = req.body;
    const vehicle = await Vehicle.findOneAndUpdate({ vehicleId }, updatedData, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addVehicle, getVehicle, updateVehicle };
