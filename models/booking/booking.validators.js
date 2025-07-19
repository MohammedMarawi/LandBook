function isEndDateAfterStartDate(value) {
  if (!this.startDate || !value) return true;
  return value > this.startDate;
}
module.exports = { isEndDateAfterStartDate };
    