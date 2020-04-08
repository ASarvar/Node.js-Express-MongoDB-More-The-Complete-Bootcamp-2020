"use strict";var Review=require("./../models/reviewModel"),catchAsync=require("./../utils/catchAsync"),factory=require("./handlerFactory");exports.getAllReviews=catchAsync(function(r,t){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s={},r.params.tourId&&(s={tour:r.params.tourId}),e.next=4,regeneratorRuntime.awrap(Review.find(s));case 4:a=e.sent,t.status(200).json({status:"success",results:a.length,data:{reviews:a}});case 6:case"end":return e.stop()}})}),exports.setTourUserIds=function(e,r,t){e.body.tour||(e.body.tour=e.params.tourId),e.body.user||(e.body.user=e.user.id),t()},exports.createReview=factory.createOne(Review),exports.updateReview=factory.updateOne(Review),exports.deleteReview=factory.deleteOne(Review);