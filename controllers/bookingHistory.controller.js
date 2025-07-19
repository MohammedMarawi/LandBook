const BookingHistory = require('../models/booking/BookingHistory');
const catchAsync = require('../utils/catchAsync')

const getLandHistory =catchAsync( async (req, res, next) => {
    const landId = req.params.landId;
    const history = await BookingHistory.getLandHistory(landId)
                                        .populate('user', 'email');

    res.json({ status: 'success', data: history });
});

module.exports = {
  getLandHistory
};
