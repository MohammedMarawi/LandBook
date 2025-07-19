const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  land: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  season: {
    type: String,
    required: true,
    trim: true
  },
  crop: {
    type: String,
    required: true,
    trim: true
  },
  production: {
    type: String, 
    required: true,
    trim: true
  },
  investorEmail: {
    type: String,
    required: true,
    trim: true
  },
  problems: {
    type: String,
    default: 'None',
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

bookingHistorySchema.statics.getLandHistory = function(landId) {
  return this.find({ land: landId }).sort({ startDate: -1 });
};

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);
