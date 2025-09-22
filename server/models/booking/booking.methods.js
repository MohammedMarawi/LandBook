function hasActiveBooking(user) {
    return this.findOne({
      user,
      status: { $in: ['pending', 'confirmed'] }
    });
}

function isExpired() {
  return new Date() > this.endDate;
}

function addBookingMethods(schema) {
  schema.statics.hasActiveBooking = hasActiveBooking;
  schema.methods.isExpired = isExpired;
}

module.exports = {
  addBookingMethods,
  hasActiveBooking,
  isExpired
};
