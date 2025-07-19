const mongoose = require('mongoose');
const { isEndDateAfterStartDate } = require('./booking.validators');
const { addBookingMethods }= require('./booking.methods');
const {applyBookingHooks }= require('./booking.hooks');


const bookingSchema = new mongoose.Schema({
  land: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: [true, 'A booking must belong to a land.'],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A booking must belong to a user.'],
  },

  phoneNumber: {
    type: String,
    required: [true, 'A booking must have a phone number for contact.'],
    trim: true
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date,
    required: [true, 'A booking must have an end date.'],
    validate: { validator: isEndDateAfterStartDate,
    message: 'End date must be after start date.'
   }
  },

  status: {
    type: String,       
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'expired'],
    default: 'pending',
  },

  confirmedAt: {
    type: Date,
    default: null
  },

  confirmationSent: {
    type: Boolean,
    default: false
  },

  meetingScheduled: {
    type: Boolean,
    default: false
  },

  meetingDate: {
    type: Date,
    default: null
  },
  
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

bookingSchema.index({ userId: 1, status: 1 });

addBookingMethods(bookingSchema);
applyBookingHooks(bookingSchema);

module.exports = mongoose.model('Booking', bookingSchema);