const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/land/:landId/availability', bookingController.checkLandAvailability);

// Protected routes
router.use(protect); // All routes after this middleware are protected

// User routes
router.get('/my-active-booking', bookingController.getUserActiveBooking);
router.post('/', bookingController.createBooking);

// Admin routes
router.use(restrictTo('admin'));

router.route('/')
  .get(bookingController.getAllBookings);

router.route('/:id')
  .get(bookingController.getBookingById)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router.get('/land/:landId', bookingController.getBookingsByLand);
router.post('/expire-old', bookingController.expireOldBookings);

module.exports = router;


//GET /api/bookings/user/:userId   (get all booking with user)
// GET /api/bookings/land/:landId  (get all booking with land)
// PATCH /api/bookings/:id/status  (confirm booking or change status)
//POST /api/bookings/check-availability (Checking the availability of land within a certain period)
// GET /api/bookings/stats (num total booking)


