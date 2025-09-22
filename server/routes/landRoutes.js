const express = require('express');
const Landcontrollers = require('../controllers/landsController');
const authcontrollers = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');
const upload = require('../utils/multer')
const router = express.Router();



router.use('/:landId/reviews', reviewRouter);




router.get('/lands-stats', Landcontrollers.getLandsStats);
router.get('/stats/location', Landcontrollers.getLandStatsByLocation);

router
  .route('/:id/reserve')
  .patch(
  authcontrollers.protect,
  authcontrollers.restrictTo('user', 'investor'),
  Landcontrollers.reserveLand
);

router
  .route('/:id/approve')
  .patch(
    authcontrollers.protect,
    authcontrollers.restrictTo('admin'),
    Landcontrollers.approveLand
  );

router
  .route('/')
  .get(Landcontrollers.getAllLands)
  .post(
    authcontrollers.protect,
    authcontrollers.restrictTo('landowner'),
    upload.single('image'),          
    Landcontrollers.createLand
  ); 

router
  .route('/:id')
  .get(Landcontrollers.getSingleLand)
  .patch(
    authcontrollers.protect,
    authcontrollers.restrictTo('admin'),
    Landcontrollers.updateLand
  )

  .delete(
    authcontrollers.protect,
    authcontrollers.restrictTo('admin'),
    Landcontrollers.deleteLand
  );

module.exports = router;
