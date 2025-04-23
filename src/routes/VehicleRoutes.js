const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/VehicleController');

router.post('/', vehicleController.addVehicle);   // Add a new vehicle
router.get('/', vehicleController.getVehicle);    // Get vehicle details
router.put('/:vehicleId', vehicleController.updateVehicle); // Update vehicle

module.exports = router;