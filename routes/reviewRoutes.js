const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });



router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('investor', 'user'),
    reviewController.createReviews
  )
  .get(reviewController.getAllReviews);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin', 'investor'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin', 'investor'),
    reviewController.deleteReview
  );

module.exports = router;
