const routes = require('express').Router();
const bookingController = require('../controllers/BookingController');

routes.post("/", bookingController.createBooking);
routes.get("/", bookingController.getAllBookings);
routes.get("/:id", bookingController.getBookingById);
routes.put("/:id", bookingController.updateBooking);
routes.delete("/:id", bookingController.deleteBooking);

module.exports = routes;