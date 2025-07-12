const mongoose = require('mongoose');
const Land = require('../models/Land');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// Create a new land
const createLand = catchAsync(async (req, res, next) => {
  const land = await Land.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      land
    },
  });
});

// Get all lands with filtering
const getAllLands = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Land.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const lands = await features.query;

  res.status(200).json({
    status: 'success',
    results: lands.length,
    data: {
      lands
    },
  });
});

// Get land by ID
const getLandById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid land ID', 400));
  }

  const land = await Land.findById(id);
  if (!land) {
    return next(new AppError('Land not found', 404));
  }

  res.status(200).json({ status: 'success', data: { land } });
});

// Update land
const updateLand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid land ID', 400));
  }
  
  const land = await Land.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!land) {
    return next(new AppError('Land not found', 404));
  }

  res.status(200).json({ status: 'success', data: { land } });
});

// Delete land
const deleteLand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid land ID', 400));
  }

  const land = await Land.findByIdAndDelete(id);
  if (!land) {
    return next(new AppError('Land not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Land deleted successfully.',
    data: {
      land
    }
  });
});

// Get available lands
const getAvailableLands = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Land.find({ status: 'available' }), 
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const lands = await features.query;

  res.status(200).json({
    status: 'success',
    results: lands.length,
    data: {
      lands
    },
  });
});

// Get lands by owner
const getLandsByOwner = catchAsync(async (req, res, next) => {
  const { ownerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return next(new AppError('Invalid owner ID', 400));
  }

  const lands = await Land.find({ owner: ownerId }).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: lands.length,
    data: {
      lands
    }
  });
});

// Update land status (admin only)
const updateLandStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, rentalEndDate } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid land ID', 400));
  }
  
  const updateData = { status };
  
  if (status === 'rented' && rentalEndDate) {
    updateData.rentalEndDate = new Date(rentalEndDate);
  } else if (status === 'available') {
    updateData.rentalEndDate = null;
    updateData.currentBooking = null;
    updateData.bookingExpiresAt = null;
  }
  
  const land = await Land.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  
  if (!land) {
    return next(new AppError('Land not found', 404));
  }

  res.status(200).json({ status: 'success', data: { land } });
});

// Get land statistics
const getLandStats = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalLands = await Land.countDocuments();
  const availableLands = await Land.countDocuments({ status: 'available' });
  const bookedLands = await Land.countDocuments({ status: 'booked' });
  const rentedLands = await Land.countDocuments({ status: 'rented' });

  res.status(200).json({
    status: 'success',
    data: {
      stats,
      totalLands,
      availableLands,
      bookedLands,
      rentedLands
    }
  });
});

module.exports = {
  createLand,
  getAllLands,
  getLandById,
  updateLand,
  deleteLand,
  getAvailableLands,
  getLandsByOwner,
  updateLandStatus,
  getLandStats
}; 