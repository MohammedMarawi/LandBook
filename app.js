const express = require('express');
const configureApp = require('./config/app');
const connectDB = require('./config/database'); 
const { scheduleBookingJobs } = require('./utils/cronJobs');
const startServer = require('./config/server');
require('dotenv').config();
const app = express();


configureApp(app);

(async () => {
  try {
    await connectDB();
    scheduleBookingJobs();
    startServer(app);
  } catch (error) {
    console.error('Startup error:', error.message);
    process.exit(1);
  }
})();

module.exports = app;
