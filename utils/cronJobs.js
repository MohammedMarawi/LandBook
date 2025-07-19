const Booking = require('../models/booking/Booking');
const { updateExpiredBookings, completeExpiredConfirmedBookings , getTestEvaluationData } = require('../services/booking.service');


async function expireBookings() {
  const result = await updateExpiredBookings();
  console.log(`[${new Date().toISOString()}] Expired ${result.modifiedCount} bookings`);
  return result.modifiedCount;
}



async function autoCompleteBookings() {
  const count = await completeExpiredConfirmedBookings();
  console.log(`[${new Date().toISOString()}] Completed ${count} bookings automatically.`);
  return count;
}



async function runBookingMaintenanceJob() {
  try {
    console.log(`[${new Date().toISOString()}] Running booking maintenance job...`);
    await expireBookings();
    await completeExpiredConfirmedBookings();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in booking maintenance job:`, error);
  }
}


function scheduleBookingJobs(intervalMs = 60 * 1000) {
  runBookingMaintenanceJob(); // Run immediately on startup
  setInterval(runBookingMaintenanceJob, intervalMs);
  console.log(`Booking maintenance job scheduled every ${intervalMs / 1000 / 60} minutes`);
}

module.exports = {
  scheduleBookingJobs,
  runBookingMaintenanceJob,
  expireBookings,
  autoCompleteBookings,
  completeExpiredConfirmedBookings
};
