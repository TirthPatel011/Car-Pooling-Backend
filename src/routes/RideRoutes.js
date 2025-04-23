const express = require('express');
const router = express.Router();
const rideController = require('../controllers/RideController');

router.post('/', rideController.addRide);         // Add a new ride
router.get('/', rideController.getActiveRides);   // Get active rides
router.delete('/:rideId', rideController.deleteRide); // Delete a ride
router.get('/:rideId', rideController.getRideById); // New route to get a ride by rideId

module.exports = router;