function setDefaultEndDate(schema) {
  schema.pre('save', function (next) {
    if (this.isNew && !this.endDate) {
      this.endDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24h
    }
    next();
  });
}

function applyBookingHooks(schema) {
  setDefaultEndDate(schema);
}

module.exports = {
  applyBookingHooks,
  setDefaultEndDate
};
  