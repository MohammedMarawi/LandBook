const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking.controller');
const authController = require('../controllers/authController');



router.get('/land/:landId/availability', bookingController.checkLandAvailability);


router.get(
  '/my-active-booking',
  authController.protect,
  bookingController.getUserActiveBooking
);

router.post(
  '/',
  authController.protect,
  bookingController.createBooking
);

router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  bookingController.getAllBookings
);

router.get(
  '/land/:landId',
  authController.protect,
  authController.restrictTo('admin'),
  bookingController.getBookingsByLand
);

router.post(
  '/expire-old',
  authController.protect,
  authController.restrictTo('admin'),
  bookingController.expireOldBookings
);


router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.getBookingById
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.updateBooking
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    bookingController.deleteBooking
  );



module.exports = router;
