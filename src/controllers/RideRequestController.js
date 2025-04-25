const RideRequest = require('../models/RideRequestModel');
const Ride = require('../models/RideModel');
const Booking = require('../models/BookingModel');

const createRideRequest = async (req, res) => {
  try {
    const rideRequest = new RideRequest(req.body);
    await rideRequest.save();
    res.status(201).json(rideRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRideRequestsByDriver = async (req, res) => {
  try {
    const { driverId } = req.query;
    const requests = await RideRequest.find({ driverId, status: 'pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRideRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const rideRequest = await RideRequest.findOne({ requestId });
    if (!rideRequest) return res.status(404).json({ message: 'Ride request not found' });

    rideRequest.status = status;
    if (status === 'accepted') {
      const ride = await Ride.findOne({ rideId: rideRequest.rideId });
      if (ride.availableSeats < rideRequest.seatsRequested) {
        return res.status(400).json({ message: 'Not enough available seats' });
      }
      const bookingData = {
        bookingId: `B${Date.now()}`,
        rideId: rideRequest.rideId,
        passengerId: rideRequest.passengerId,
        seatsBooked: rideRequest.seatsRequested,
        totalFare: ride.price * rideRequest.seatsRequested,
      };
      const booking = new Booking(bookingData);
      await booking.save();
      ride.availableSeats -= rideRequest.seatsRequested;
      await ride.save();
    }
    await rideRequest.save();
    res.json({ message: `Ride request ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRideRequest, getRideRequestsByDriver, updateRideRequest };