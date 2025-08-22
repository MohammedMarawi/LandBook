const mongoose = require('mongoose');
const validator = require('validator');

const LandSchema = new mongoose.Schema(
  {
    // User Information
    firstName: {
      type: String,
      required: [true, 'Please provide your first name.'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name.'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please select your gender.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address.'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address format',
      ],
    },
    phone: {
      areaCode: {
        type: String,
        required: [true, 'Please provide the phone area code.'],
        trim: true,
        validate: {
          validator: function (v) {
            return /^\+\d{1,4}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid country code!`,
        },
      },
      number: {
        type: String,
        required: [true, 'Please provide your phone number.'],
        trim: true,
      },
    },
    city: {
      type: String,
      required: [true, 'Please specify the city.'],
      trim: true,
    },
    userPhoto: {
      type: String,
      required: [true, 'Please upload a photo of yourself.'],
    },
    idPhoto: {
      type: String,
      required: [true, 'Please upload a photo of your national ID.'],
    },
    ownershipPhoto: {
      type: String,
      required: [true, 'Please upload the ownership contract photo.'],
    },

    title: {
      type: String,
      required: [true, 'Please provide a title for your land.'],
      unique: true,
      trim: true,
    },
    area: {
      type: Number,
      required: [true, 'Please specify the land area.'],
      min: [0, 'Size cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the land price.'],
      min: [0, 'Price cannot be negative'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },

    currentCrop: {
      type: [String],
      default: [],
    },

    treeAge: {
      type: Number,
      trim: true,
      min: 0,
      required: function () {
        return this.currentCrop && this.currentCrop.length > 0;
      },
    },
    workersNumber: {
      type: Number,
      trim: true,
      min: 0,
      required: function () {
        return this.currentCrop && this.currentCrop.length > 0;
      },
    },
    equipments: {
      type: [String],
      trim: true,
      required: function () {
        return this.currentCrop && this.currentCrop.length > 0;
      },
    },
    waterSource: {
      type: [String],
      required: [true, 'Please add the waterSource'],
    },
    averageRainfall: {
      type: Number,
      default: 350,
      min: 0,
    },
    irrigationMethods: {
      type: [String],
      required: [true, 'Please specify the irrigation method.'],
      trim: true,
    },
    soilTypes: {
      type: [String],
      required: [true, 'Please describe the soil type.'],
      trim: true,
    },
    suitableCrops: {
      type: [String],
      required: [true, 'Please mention what crops can be planted.'],
    },
    climateDescription: {
      type: String,
      required: [true, 'Please describe the climate.'],
      trim: true,
    },
    estimatedReturns: {
      type: String,
      required: [true, 'Please specify the expected returns.'],
      trim: true,
    },
    contractDuration: {
      type: String,
      required: [true, 'Please indicate when the land will be returned.'],
      trim: true,
    },
    location: {
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, 'Please provide the land coordinates.'],
      },
      address: {
        type: String,
        required: [true, 'Please provide the land address.'],
      },
      village: {
        type: String,
        required: [
          true,
          'Please specify the village where the land is located.',
        ],
      },
    },

    landMedia: {
      type: [String],
      required: [
        true,
        'Please upload at least one photo or video of the land.',
      ],
    },
    isApproved: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['available', 'reserved'],
      default: 'available',
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
LandSchema.index({ 'location.coordinates': '2dsphere' });
LandSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'land',
  localField: '_id',
});
module.exports = mongoose.model('land', LandSchema);