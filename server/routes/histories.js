const express = require('express');
const router = express.Router();
const { getLandHistory } = require('../controllers/bookingHistory.controller');

router.get('/land/:landId', getLandHistory);

module.exports = router;
