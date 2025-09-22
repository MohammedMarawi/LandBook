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




const createBooking = catchAsync(async (req, res, next) => {
  const { land, phoneNumber} = req.body;
  const userId = req.user.id;

  if(req.user.role !== "inverstor") 
  {
    await User.findByIdAndUpdate(req.user.id , {role: "inverstor"}) ;
  }

  if (await userHasActiveBooking(userId)) {
    return next(new AppError(
      'You already have an active booking. You cannot book another land until the current booking is processed.',
      400
    ));
  }

  if (await landIsReserved(land)) {
    return next(new AppError(
      'This land is currently reserved by another user. Please try again later.',
      400
    ));
  }

  const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const booking = await Booking.create({
    land,
    user : userId,
    phoneNumber,
    endDate
  });

  res.status(201).json({
    status: 'success',
    message: 'Land booked successfully. You will be contacted soon by the administration.',
    data: { booking },
  });
});





const getAllBookings = catchAsync(async (req, res, next) => {
  const queryBuilder = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bookings = await queryBuilder.query;

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: { bookings }
  });
});



const getBookingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { booking }
  });
});



const updateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, adminNotes, meetingDate , endDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  const updates = {
    endDate,
    status,
    adminNotes,
    meetingDate: meetingDate ? new Date(meetingDate) : null,
    meetingScheduled: Boolean(meetingDate),
    confirmedAt: status === 'confirmed' ? new Date() : booking.confirmedAt
  };

  const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { booking: updatedBooking }
  });
});



const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  await booking.deleteOne(); 
  res.status(200).json({
    status: 'success',
    message: 'Booking deleted successfully.',
    data: { booking }
  });
});



const getUserActiveBooking = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const activeBooking = await Booking.hasActiveBooking(userId);

  const response = {
    hasActiveBooking: Boolean(activeBooking),
    booking: activeBooking || null
  };

  res.status(200).json({
    status: 'success',
    data: response
  });
});



  const getBookingsByLand = catchAsync(async (req, res, next) => {
    const { landId } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(landId)){
      return next(new AppError('Invalid land ID', 400));
    }

    const bookings = await Booking.find({ land: landId }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: { bookings }
    });
  });



const checkLandAvailability = catchAsync(async (req, res, next) => {
  const { landId } = req.params;

  if (!landId) {
    return next(new AppError('Land ID is required', 400));
  }

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