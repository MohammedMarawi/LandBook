const Review = require('../models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
exports.getAllReviews = catchAsync(async (req, res, next) => {
  // Allow nested routes
  let filter = {};
  if (req.params.landId) filter = { land: req.params.landId };
  const features = new APIFeatures(Review.find(filter), req.query)
    .filter() 
    .sort() 
    .limitFields() 
    .paginate() 
  const reviews = await features.query;
  // SEND RESPONSSE
  // console.log (lands.length)
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReviews = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.land) req.body.land = req.params.landId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError(`No review found with that ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError(`No review found with that ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError(`No review found with that ID`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
// Nested Routes

// POST / land /:landId/reviews
// GET / land /:landId/reviews
// GET / land /:landId/reviews/:id
// PATCH / land /:landId/reviews/:id
// DELETE / land /:landId/reviews/:id
