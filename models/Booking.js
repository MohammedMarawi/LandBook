const mongoose = require('mongoose');

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
    validate: {
      validator: function(value) {
        if (this.startDate && value) {
          return value > this.startDate;
        }
        return true;
      },
      message: 'End date must be after start date.',
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

// Index to ensure one active booking per user
bookingSchema.index({ user: 1, status: 1 });

// Pre-save middleware to set default end date (24 hours from now)
bookingSchema.pre('save', function(next) {
  if (this.isNew && !this.endDate) {
    this.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  }
  next();
});

// Pre-find middleware to populate related data
bookingSchema.pre(/^find/, function(next) {
  this.populate('user', 'name email').populate({
    path: 'land',
    select: 'name location status price'
  });
  next();
});

// Static method to check if user has active booking
bookingSchema.statics.hasActiveBooking = async function(userId) {
  const activeBooking = await this.findOne({
    user: userId,
    status: { $in: ['pending', 'confirmed'] }
  });
  return activeBooking;
};

// Instance method to check if booking is expired
bookingSchema.methods.isExpired = function() {
  return new Date() > this.endDate;
};

module.exports = mongoose.model('Booking', bookingSchema);

//Booking convert utomatic to bookings
//to receive data in user 
//Booking.find().populate('user_id');


//confirmed_at
// if (booking.status === 'pending') {
//   booking.status = 'confirmed';
//   booking.confirmed_at = new Date();
// }

// | الحقل          | المعنى                                  |
// | -------------- | --------------------------------------- |
// | `created_at`   | متى تم إنشاء الحجز                      |
// | `confirmed_at` | متى تم تأكيد الحجز                      |
// | `updated_at`   | آخر مرة تم تعديل الحجز (قد تكون أي شيء) |


//confirmation_send
// if (booking.status === 'confirmed' && !booking.confirmation_sent) {
//   // 1. أرسل الإشعار
//   await sendEmailToUser(booking.user_id);

//   // 2. حدّث العلم
//   booking.confirmation_sent = true;
//   await booking.save();
// }
