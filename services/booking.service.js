const Booking = require('../models/booking/Booking');
const BookingHistory = require('../models/booking/BookingHistory');
const { getSeasonFromDate } = require('../utils/dateUtils');


const updateExpiredBookings = async () => {
  const now = new Date();
  const result = await Booking.updateMany(
    {
      status: { $in: ['pending'] },
      endDate: { $lt: now }
    },
    {
      $set: { status: 'expired' }
    }
  );
  return result;
};



const userHasActiveBooking = async (userId) => {
  return await Booking.hasActiveBooking(userId);
};



const landIsReserved = async (landId) => {
  return await Booking.findOne({
    land: landId,
    status: { $in: ['pending', 'confirmed'] },
    endDate: { $gt: new Date() }
  });
};



const completeExpiredConfirmedBookings = async () => {
  const now = new Date();

  const expiredBookings = await Booking.find({
    status: 'confirmed',
    endDate: { $lt: now }
  });

  for (const booking of expiredBookings) {
    await completeBooking(booking._id, getTestEvaluationData());
  }

  return expiredBookings.length;
};




async function completeBooking(bookingId, evaluationData) {
  const booking = await Booking.findById(bookingId).populate('user');
  if (!booking) throw new Error('Booking not found');
  
  booking.status = 'completed';
  await booking.save();

  const season = getSeasonFromDate(booking.startDate);
  
  await BookingHistory.create({
    land: booking.land,
    user: booking.user._id,
    investorEmail: booking.user.email,
    crop: evaluationData.crop,
    production: evaluationData.production,
    problems: evaluationData.problems,
    startDate: booking.startDate,
    endDate: booking.endDate,
    season
  });
  
  return { message: 'Booking completed and history saved successfully' };
}

// دالة تجريبية لإرجاع بيانات تقييم ثابتة
function getTestEvaluationData() {
  return {
    crop: 'bnana',
    production: 1200,
    problems : "no problems"
  };
}

module.exports = {
  updateExpiredBookings,
  userHasActiveBooking,
  landIsReserved,
  completeBooking,
  completeExpiredConfirmedBookings, 
  getTestEvaluationData
};

