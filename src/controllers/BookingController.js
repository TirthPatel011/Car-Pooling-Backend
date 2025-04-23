// controllers/BookingController.js
const Booking = require('../models/BookingModel');
const Ride = require('../models/RideModel');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { bookingId, rideId, passengerId, seatsBooked } = req.body;
        const ride = await Ride.findOne({ rideId });
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        if (ride.availableSeats < seatsBooked) return res.status(400).json({ message: 'Not enough available seats' });

        const totalFare = seatsBooked * ride.price;
        const newBooking = new Booking({ bookingId, rideId, passengerId, seatsBooked, totalFare });

        // Update available seats in the ride
        ride.availableSeats -= seatsBooked;
        await ride.save();

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
      const { passengerId } = req.query;
      const bookings = await Booking.find({ passengerId });
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: error.message });
    }
  };

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.id }).populate('rideId passengerId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update booking
const updateBooking = async (req, res) => {
    try {
        const { seatsBooked } = req.body;
        const booking = await Booking.findOne({ bookingId: req.params.id });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const ride = await Ride.findOne({ rideId: booking.rideId });
        if (!ride) {
            return res.status(404).json({ message: 'Associated ride not found' });
        }

        // Adjust available seats
        const seatDifference = seatsBooked - booking.seatsBooked;
        if (ride.availableSeats < seatDifference) {
            return res.status(400).json({ message: 'Not enough available seats' });
        }

        ride.availableSeats -= seatDifference;
        await ride.save();

        booking.seatsBooked = seatsBooked;
        booking.totalFare = seatsBooked * ride.price;
        const updatedBooking = await booking.save();
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ bookingId: req.params.id });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        const ride = await Ride.findOne({ rideId: booking.rideId });
        if (ride) {
            ride.availableSeats += booking.seatsBooked;
            await ride.save();
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};