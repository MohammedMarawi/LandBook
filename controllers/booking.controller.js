const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Land = require('../models/Land');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// Create a new booking
const createBooking = catchAsync(async (req, res, next) => {
  const { landId, phoneNumber } = req.body;
  const userId = req.user.id; // Assuming user is authenticated

  // Check if user has an active booking
  const existingBooking = await Booking.hasActiveBooking(userId);
  if (existingBooking) {
    return next(new AppError('لديك حجز نشط بالفعل. لا يمكنك حجز أرض أخرى حتى يتم التعامل مع الحجز الحالي.', 400));
  }

  // Check if land is available
  const land = await Land.findById(landId);
  if (!land) {
    return next(new AppError('الأرض غير موجودة.', 404));
  }

  if (land.status !== 'available') {
    return next(new AppError('الأرض غير متاحة للحجز حالياً.', 400));
  }

  // Create booking
  const booking = await Booking.create({
    land: landId,
    user: userId,
    phoneNumber,
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });

  // Update land status
  await Land.findByIdAndUpdate(landId, {
    status: 'booked',
    currentBooking: booking._id,
    bookingExpiresAt: booking.endDate
  });

  res.status(201).json({
    status: 'success',
    message: 'تم حجز الأرض بنجاح، سيتم التواصل معك قريباً من قبل الإدارة.',
    data: {
      booking
    },
  });
});

// Get all bookings (with filtering)
const getAllBookings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const bookings = await features.query;

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    },
  });
});

// Get booking by ID
const getBookingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  res.status(200).json({ status: 'success', data: { booking } });
});

// Update booking (admin only)
const updateBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, adminNotes, meetingDate } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }
  
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Update booking
  const updatedBooking = await Booking.findByIdAndUpdate(id, {
    status,
    adminNotes,
    meetingDate: meetingDate ? new Date(meetingDate) : null,
    meetingScheduled: !!meetingDate,
    confirmedAt: status === 'confirmed' ? new Date() : booking.confirmedAt
  }, {
    new: true,
    runValidators: true,
  });

  // Update land status based on booking status
  const land = await Land.findById(booking.land);
  if (land) {
    let newLandStatus = 'available';
    let newBookingExpiresAt = null;

    switch (status) {
      case 'confirmed':
        newLandStatus = 'booked';
        newBookingExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        break;
      case 'completed':
        newLandStatus = 'rented';
        newBookingExpiresAt = null;
        break;
      case 'cancelled':
      case 'expired':
        newLandStatus = 'available';
        newBookingExpiresAt = null;
        break;
      default:
        newLandStatus = land.status;
    }

    await Land.findByIdAndUpdate(booking.land, {
      status: newLandStatus,
      bookingExpiresAt: newBookingExpiresAt,
      currentBooking: newLandStatus === 'available' ? null : booking._id
    });
  }

  res.status(200).json({ status: 'success', data: { booking: updatedBooking } });
});

// Delete booking
const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid booking ID', 400));
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Update land status back to available
  await Land.findByIdAndUpdate(booking.land, {
    status: 'available',
    currentBooking: null,
    bookingExpiresAt: null
  });

  await Booking.findByIdAndDelete(id);
  
  res.status(200).json({
    status: 'success',
    message: 'Booking deleted successfully.',
    data: {
      booking
    }
  });
});

// Get user's active booking
const getUserActiveBooking = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const activeBooking = await Booking.hasActiveBooking(userId);
  
  res.status(200).json({
    status: 'success',
    data: {
      hasActiveBooking: !!activeBooking,
      booking: activeBooking
    }
  });
});

// Get bookings by land
const getBookingsByLand = catchAsync(async (req, res, next) => {
  const { landId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(landId)) {
    return next(new AppError('Invalid land ID', 400));
  }

  const bookings = await Booking.find({ land: landId }).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

// Check land availability
const checkLandAvailability = catchAsync(async (req, res, next) => {
  const { landId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(landId)) {
    return next(new AppError('Invalid land ID', 400));
  }

  const land = await Land.findById(landId);
  if (!land) {
    return next(new AppError('Land not found', 404));
  }

  const isAvailable = land.status === 'available';
  const bookingExpiresAt = land.bookingExpiresAt;

  res.status(200).json({
    status: 'success',
    data: {
      isAvailable,
      status: land.status,
      bookingExpiresAt,
      bookingStatusText: land.bookingStatusText
    }
  });
});

// Expire old bookings (cron job function)
const expireOldBookings = catchAsync(async (req, res, next) => {
  const expiredBookings = await Booking.find({
    status: { $in: ['pending', 'confirmed'] },
    endDate: { $lt: new Date() }
  });

  for (const booking of expiredBookings) {
    // Update booking status
    await Booking.findByIdAndUpdate(booking._id, { status: 'expired' });
    
    // Update land status
    await Land.findByIdAndUpdate(booking.land, {
      status: 'available',
      currentBooking: null,
      bookingExpiresAt: null
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Expired ${expiredBookings.length} bookings`,
    data: {
      expiredCount: expiredBookings.length
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
  expireOldBookings
};