const express = require('express');
const router = express.Router();
const landController = require('../controllers/land.controller');
const { protect, restrictTo, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/available', landController.getAvailableLands);
router.get('/:id', landController.getLandById);

// Protected routes
router.use(protect);

// User routes
router.get('/owner/:ownerId', landController.getLandsByOwner);

// Admin routes
router.use(restrictTo('admin'));

router.route('/')
  .post(landController.createLand)
  .get(landController.getAllLands);

router.route('/:id')
  .patch(landController.updateLand)
  .delete(landController.deleteLand);

router.patch('/:id/status', landController.updateLandStatus);
router.get('/stats/overview', landController.getLandStats);

module.exports = router; 