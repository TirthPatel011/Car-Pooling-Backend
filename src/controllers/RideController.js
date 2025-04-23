const Ride = require('../models/RideModel');

// Add a new ride
const addRide = async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get active rides for a driver
const getActiveRides = async (req, res) => {
  try {
    const { source, destination, dateTime, driverId } = req.query;
    let query = { status: 'active' };

    // Add driverId to the query if provided
    if (driverId) query.driverId = driverId;
    if (source) query.source = { $regex: source, $options: 'i' };
    if (destination) query.destination = { $regex: destination, $options: 'i' };
    if (dateTime) {
      const start = new Date(dateTime);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dateTime);
      end.setHours(23, 59, 59, 999);
      query.dateTime = { $gte: start, $lte: end };
    }

    const rides = await Ride.find(query);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add this to delete a ride
const deleteRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    await Ride.findOneAndDelete({ rideId });
    res.json({ message: 'Ride deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add this to get a ride byrideId
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findOne({ rideId: req.params.rideId });
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addRide, getActiveRides, deleteRide,getRideById };

