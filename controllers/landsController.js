const Land = require('../models/landsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllLands= catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Land.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const lands = await features.query;
  // SEND RESPONSSE
  // console.log (lands.length)
  res.status(200).json({
    status: 'success',
    results: lands.length,
    data: {
        lands,
    },
  });
});
exports.getSingleLand = catchAsync(async (req, res, next) => {
  const land = await Land.findById(req.params.id).populate('reviews');
//   .populate('reviews');
  // const tours = await Tour.findOne({ _id: req.params.id });
  if (!land) {
    return next(new AppError(`No found land ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
        land,
    },
  });
});
exports.createLand = catchAsync(async (req, res, next) => {
  const newLand = await Land.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      land: newLand,
    },
  });
});
exports.updateLand = catchAsync(async (req, res, next) => {
  const land = await Land.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!land) {
    return next(new AppError(`No land found with that ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      land,
    },
  });
});
exports.deleteLand = catchAsync(async (req, res, next) => {
  // const tour = await Tour.findOneAndDelete({ _id:  req.params.id  });
  const land = await Land.findByIdAndDelete(req.params.id);
  if (!land) {
    return next(new AppError(`No land found with that ID`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null, // 204 no content
  });
});

exports.getLandsStats = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: '$location', 
        numLands: { $sum: 1 },
        avgArea: { $avg: '$area' },
        avgPrice: { $avg: '$price' }
      }
    },
    {
      $sort: { numLands: -1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
})
exports.getLandStatsByLocation = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: {
          // city: "$location.city",
          governorate: "$location.governorate",
          // address: "$location.address" 
        },
        numLands: { $sum: 1 },
        avgArea: { $avg: "$area" },
        avgPrice: { $avg: "$price" }
      }
    },
    {
      $sort: { numLands: -1 } 
    }
  ]);

  res.status(200).json({
    status: "success",
    results: stats.length,
    data: {
      stats
    }
  });
});