"use strict";var express=require("express"),reviewController=require("./../controllers/reviewController"),authController=require("./../controllers/authController"),router=express.Router();router.route("/").get(reviewController.getAllReviews).post(authController.protect,authController.restrictTo("user"),reviewController.createReview),module.exports=router;