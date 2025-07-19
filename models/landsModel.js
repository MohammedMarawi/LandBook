const mongoose = require('mongoose');
const User = require('./usersModel');
const LandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the land'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add the land price'],
      min: [0, 'Price cannot be negative'],
    },
    area: {
      type: Number,
      required: [true, 'Please add the land size in acres'],
      min: [0, 'Size cannot be negative'],
    },
    location: {
      city: {
        type: String,
        required: [true, 'Please add the city'],
      },
      governorate: {
        type: String,
        required: [true, 'Please add the governorate'],
      },
      coordinates: {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
      address: {
        type: String,
        required: [true, 'Please add the address'],
      },
    },
    climate: {
      type: [String],
      required: [true, 'Please specify the climate type'],
      default: ['Mediterranean'],
    },
    averageRainfall: {
      type: Number,
      default: 350,
      min: 0,
    },
    temperatureRange: {
      min: {
        type: Number,
        default: 3,
      },
      max: {
        type: Number,
        default: 35,
      },
    },
    currentCrops: {
      type: [String],
      required: [true, 'Please add at least one crop'],
    },
    features: {
      waterSource: {
        type: [String],
        required: [true, 'Please add the waterSource'],
      },
      soilType: {
        type: [String],
        required: [true, 'Please add the soilType'],
      },
    },
    treeAge: {
      type: Number,
      required: [true, 'Please add the tree age'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    investmentOpportunities: [
      {
        type: {
          type: String,
          required: [true, 'Please add the investmentOpportunities'],
        },
        minInvestment: {
          type: Number,
          default: 0,
        },
        expectedReturn: {
          type: Number,
          default: 0,
        },
        returnPeriod: {
          type: String,
          default: '',
        },
      },
    ],
    images: {
      type: [String],
      require: [true, 'Please add the images'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// LandSchema.index({ 'location.coordinates': '2dsphere' });
LandSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'land',
  localField: '_id',
});
LandSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'reviews',
    select: 'review rating user',
  });
  next();
});
module.exports = mongoose.model('Land', LandSchema);