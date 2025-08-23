const Land = require('../models/landsModel');
const User = require('../models/usersModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary = require('cloudinary').v2;

// ======================= GET ALL LANDS =======================
exports.getAllLands = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Land.find(), req.query)
    .filter() 
    .sort() 
    .limitFields() 
    .paginate() 
  const lands = await features.query;

  res.status(200).json({
    status: 'success',
    results: lands.length,
    data: { lands },
  });
});

// ======================= GET SINGLE LAND =======================
exports.getSingleLand = catchAsync(async (req, res, next) => {
  const land = await Land.findById(req.params.id).populate('reviews');
  if (!land) return next(new AppError('No land found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { land },
  });
});

// ======================= CREATE LAND =======================
exports.createLand = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  if (!req.body.status) req.body.status = 'available';

  const newLand = await Land.create({
    ...req.body,
    imageUrl: req.file.path,     // رابط الصورة من Cloudinary
    imageId: req.file.filename,  // الـ public_id
  });

  res.status(201).json({
    status: 'success',
    data: { land: newLand },
  });
});

// ======================= UPDATE LAND =======================
exports.updateLand = catchAsync(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new AppError('No land found with that ID', 404));

  // تحديث الصورة إذا تم رفع واحدة جديدة
  if (req.file) {
    if (land.imageId) await cloudinary.uploader.destroy(land.imageId);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'lands',
    });

    req.body.imageUrl = result.secure_url;
    req.body.imageId = result.public_id;
  }

  const updatedLand = await Land.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { land: updatedLand },
  });
});

// ======================= DELETE LAND =======================
exports.deleteLand = catchAsync(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new AppError('No land found with that ID', 404));

  // حذف الصورة من Cloudinary
  if (land.imageId) await cloudinary.uploader.destroy(land.imageId);

  await land.remove();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// ======================= RESERVE LAND =======================
exports.reserveLand = catchAsync(async (req, res, next) => {
  const land = await Land.findById(req.params.id);
  if (!land) return next(new AppError('No land found with that ID', 404));

  if (land.status === 'reserved')
    return next(new AppError('This land is already reserved', 400));

  land.status = 'reserved';
  await land.save();

  if (req.user.role === 'user') {
    await User.findByIdAndUpdate(req.user.id, { role: 'investor' });
  }

  res.status(200).json({
    status: 'success',
    message: 'Land reserved successfully',
    data: { land },
  });
});

// ======================= APPROVE OR REJECT LAND =======================
exports.approveLand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status))
    return next(
      new AppError('Invalid approval status. Must be "approved" or "rejected".', 400)
    );

  if (status === 'approved') {
    const land = await Land.findByIdAndUpdate(
      id,
      { isApproved: 'approved' },
      { new: true, runValidators: true }
    );

    if (!land) return next(new AppError('No land found with that ID', 404));

    return res.status(200).json({
      status: 'success',
      message: 'Land approved successfully',
      data: { land },
    });
  }

  if (status === 'rejected') {
    const land = await Land.findById(id);
    if (!land) return next(new AppError('No land found with that ID', 404));

    if (land.imageId) await cloudinary.uploader.destroy(land.imageId);

    await land.remove();

    return res.status(200).json({
      status: 'success',
      message: 'Land rejected and deleted successfully',
    });
  }
});

// ======================= LAND STATS =======================
exports.getLandsStats = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: '$location.village',
        numLands: { $sum: 1 },
        numReserved: { $sum: { $cond: [{ $eq: ['$status', 'reserved'] }, 1, 0] } },
        avgArea: { $avg: '$area' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { numLands: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

exports.getLandStatsByLocation = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: '$city',
        numLands: { $sum: 1 },
        numReserved: { $sum: { $cond: [{ $eq: ['$status', 'reserved'] }, 1, 0] } },
        avgArea: { $avg: '$area' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { numLands: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: { stats },
  });
});
