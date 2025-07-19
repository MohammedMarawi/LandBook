const mongoose = require('mongoose');
const Booking = require('../models/booking/Booking');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/usersModel.js')
const { formatDateTimeInDamascus } = require('../utils/dateUtils');
const {
  updateExpiredBookings,
  userHasActiveBooking,
  landIsReserved
} = require('../services/booking.service');




// Create a new booking
const createBooking = catchAsync(async (req, res, next) => {
  const { land, phoneNumber} = req.body;
  const userId = req.user.id;

  if(req.user.role !== "inverstor") 
  {
    await User.findByIdAndUpdate(req.user.id , {role: "inverstor"}) ;
  }

  // Step 1: Check if user already has active booking
  if (await userHasActiveBooking(userId)) {
    return next(new AppError(
      'You already have an active booking. You cannot book another land until the current booking is processed.',
      400
    ));
  }

  // Step 2: Check if the land is already reserved
  if (await landIsReserved(land)) {
    return next(new AppError(
      'This land is currently reserved by another user. Please try again later.',
      400
    ));
  }

  // Step 3: Set booking end time (24 hours later)
  const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Step 4: Create the booking
  const booking = await Booking.create({
    land,
    user : userId,
    phoneNumber,
    endDate
  });

  // Step 5: Send response
  res.status(201).json({
    status: 'success',
    message: 'Land booked successfully. You will be contacted soon by the administration.',
    data: { booking },
  });
});





// Get all bookings (with filtering, sorting, pagination, and field limiting)
const getAllBookings = catchAsync(async (req, res, next) => {
  // Build query with API features
  const queryBuilder = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Execute query
  const bookings = await queryBuilder.query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: { bookings }
  });
});



// Get booking by ID
const getBookingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate booking ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  // Retrieve booking
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Send success response
  res.status(200).json({
    status: 'success',
    data: { booking }
  });
});



// Update booking (admin only)
const updateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, adminNotes, meetingDate , endDate } = req.body;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  // Fetch booking
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Prepare update fields
  const updates = {
    endDate,
    status,
    adminNotes,
    meetingDate: meetingDate ? new Date(meetingDate) : null,
    meetingScheduled: Boolean(meetingDate),
    confirmedAt: status === 'confirmed' ? new Date() : booking.confirmedAt
  };

  // Perform update
  const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  // Send response
  res.status(200).json({
    status: 'success',
    data: { booking: updatedBooking }
  });
});



// Delete booking (admin only)
const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate booking ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  // Find booking
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Delete booking
  await booking.deleteOne(); // أكثر وضوحًا من findByIdAndDelete(id)

  // Send response
  res.status(200).json({
    status: 'success',
    message: 'Booking deleted successfully.',
    data: { booking }
  });
});



// Get user's active booking
const getUserActiveBooking = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Check if the user has an active booking
  const activeBooking = await Booking.hasActiveBooking(userId);

  // Prepare response payload
  const response = {
    hasActiveBooking: Boolean(activeBooking),
    booking: activeBooking || null
  };

  // Send response
  res.status(200).json({
    status: 'success',
    data: response
  });
});



// Get all bookings for a specific land
  const getBookingsByLand = catchAsync(async (req, res, next) => {
    const { landId } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(landId)){
      return next(new AppError('Invalid land ID', 400));
    }

    // Fetch bookings related to the land, newest first
    const bookings = await Booking.find({ land: landId }).sort('-createdAt');

    // Send response
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: { bookings }
    });
  });



// Check if a land is available for booking
const checkLandAvailability = catchAsync(async (req, res, next) => {
  const { landId } = req.params;

  if (!landId) {
    return next(new AppError('Land ID is required', 400));
  }

  // Find active (not expired) booking for the land
  const activeBooking = await Booking.findOne({
    land: landId,
    status: { $in: ['pending', 'confirmed'] },
    endDate: { $gt: new Date() }
  });

  const isAvailable = !activeBooking;

  const bookingExpiresAt = isAvailable ? null : formatDateTimeInDamascus(activeBooking.endDate);
  const bookingStatusText = isAvailable ? null : `Reserved until ${bookingExpiresAt}`;

  res.status(200).json({
    status: 'success',
    data: {
      isAvailable,
      status: isAvailable ? 'available' : 'reserved',
      bookingExpiresAt,
      bookingStatusText
    }
  });
});


// Marks expired bookings based on their end date
const expireOldBookings = catchAsync(async (req, res, next) => {
  const result = await updateExpiredBookings();

  res.status(200).json({
    status: 'success',
    message: `Expired ${result.modifiedCount} bookings`,
    data: {
      expiredCount: result.modifiedCount
    }
  });
});




module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserActiveBooking,
  getBookingsByLand,
  checkLandAvailability,
  expireOldBookings,
};