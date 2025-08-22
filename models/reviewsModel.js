const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    land: {
      type: mongoose.Schema.ObjectId,
      ref: 'Land',
      required: [true, 'Review must belong to a land.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewSchema.index({ land: 1, user: 1 }, { unique: true });



reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
// حساب المتوسط وعدد التقييمات تلقائيًا
// reviewSchema.statics.calcAverageRatings = async function (landId) {
//   const stats = await this.aggregate([
//     { $match: { land: landId } },
//     {
//       $group: {
//         _id: '$land',
//         nRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' },
//       },
//     },
//   ]);

//   if (stats.length > 0) {
//     await Land.findByIdAndUpdate(landId, {
//       ratingsQuantity: stats[0].nRating,
//       ratingsAverage: stats[0].avgRating,
//     });
//   } else {
//     await Land.findByIdAndUpdate(landId, {
//       ratingsQuantity: 0,
//       ratingsAverage: 4.5,
//     });
//   }
// };
// // بعد إنشاء مراجعة
// reviewSchema.post('save', function () {
//   this.constructor.calcAverageRatings(this.land);
// });
// // عند التعديل أو الحذف
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
//   if (this.r) {
//     await this.r.constructor.calcAverageRatings(this.r.land);
//   }
// });



const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
