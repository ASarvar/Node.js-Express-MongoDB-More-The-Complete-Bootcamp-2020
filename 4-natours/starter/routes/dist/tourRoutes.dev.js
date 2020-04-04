"use strict";

var express = require('express'); // const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour
// } = require('./../controllers/tourController')


var tourController = require('./../controllers/tourController');

var authController = require('./../controllers/authController');

var router = express.Router(); // router.param('id', tourController.checkID) , tourController.getAllTours

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/').get(authController.protect, tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour)["delete"](authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);
module.exports = router;