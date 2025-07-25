const express = require('express');
const bookingRoutes = require('./bookings');
const historyRoutes = require('./histories');
const landRoutes = require('./landRoutes')
const userRoutes = require('./userRoutes')
const reviewRoutes = require('./reviewRoutes')

const router = express.Router();

router.use('/bookings', bookingRoutes);

router.use('/histories', historyRoutes);

router.use('/v1/lands', landRoutes)

router.use('/v1/users' , userRoutes)

router.use('/v1/reviews' , reviewRoutes)

module.exports = router;
