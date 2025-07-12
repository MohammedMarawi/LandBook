const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A land must have a name.'],
    trim: true,
    maxlength: [100, 'Land name cannot be more than 100 characters.']
  },
  location: {
    type: String,
    required: [true, 'A land must have a location.'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A land must have a price.']
  },
  area: {
    type: Number,
    required: [true, 'A land must have an area.']
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'rented', 'sold'],
    default: 'available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A land must have an owner.']
  },
  currentBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  },
  bookingExpiresAt: {
    type: Date,
    default: null
  },
  rentalEndDate: {
    type: Date,
    default: null
  },
  images: [{
    type: String
  }],
  coordinates: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for booking status display
landSchema.virtual('bookingStatusText').get(function() {
  if (this.status === 'booked' && this.bookingExpiresAt) {
    const expiryDate = new Date(this.bookingExpiresAt);
    const formattedDate = expiryDate.toLocaleDateString('ar-SA');
    const formattedTime = expiryDate.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return `محجوزة – ينتهي الحجز في: ${formattedDate} – ${formattedTime}`;
  }
  return null;
});

// Virtual for checking if booking is expired
landSchema.virtual('isBookingExpired').get(function() {
  if (this.status === 'booked' && this.bookingExpiresAt) {
    return new Date() > this.bookingExpiresAt;
  }
  return false;
});

// Pre-find middleware to populate owner
landSchema.pre(/^find/, function(next) {
  this.populate('owner', 'name email phone');
  next();
});

module.exports = mongoose.model('Land', landSchema); 