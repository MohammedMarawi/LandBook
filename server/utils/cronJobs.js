const Booking = require('../models/booking/Booking');
const { updateExpiredBookings, completeExpiredConfirmedBookings , getTestEvaluationData } = require('../services/booking.service');


async function expireBookings() {
  const result = await updateExpiredBookings();
  return result.modifiedCount;
}



async function autoCompleteBookings() {
  const count = await completeExpiredConfirmedBookings();
  return count;
}



async function runBookingMaintenanceJob() {
  try {
    (`[${new Date().toISOString()}] Running booking maintenance job...`);
    await expireBookings();
    await completeExpiredConfirmedBookings();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in booking maintenance job:`, error);
  }
}


function scheduleBookingJobs(intervalMs = 60 * 1000) {
  runBookingMaintenanceJob(); 
  setInterval(runBookingMaintenanceJob, intervalMs);
}

module.exports = {
  scheduleBookingJobs,
  runBookingMaintenanceJob,
  expireBookings,
  autoCompleteBookings,
  completeExpiredConfirmedBookings
};
