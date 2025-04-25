const express = require('express');
const routes = express.Router();
const rideRequestController = require('../controllers/RideRequestController');
const roleRoutes = require('./RoleRoutes');

routes.post('/', rideRequestController.createRideRequest);
routes.get('/', rideRequestController.getRideRequestsByDriver);
routes.put('/:requestId', rideRequestController.updateRideRequest);

module.exports = routes;