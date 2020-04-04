"use strict";var Tour=require("./../models/tourModel"),APIFeatures=require("./../utils/apiFeatures"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError");exports.aliasTopTours=function(t,e,r){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:t.query.limit="5",t.query.sort="-ratingsAverage,price",t.query.fields="name,price,ratingsAverage,summary,difficulty",r();case 4:case"end":return e.stop()}})},exports.getAllTours=catchAsync(function(t,r){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s=new APIFeatures(Tour.find(),t.query).filter().sort().limitFields().paginate(),e.next=3,regeneratorRuntime.awrap(s.query);case 3:a=e.sent,r.status(200).json({status:"success",requestedAt:t.requestTime,results:a.length,data:{tours:a}});case 5:case"end":return e.stop()}})}),exports.getTour=catchAsync(function(t,r,s){var a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.findById(t.params.id));case 2:if(a=e.sent){e.next=5;break}return e.abrupt("return",s(new AppError("No tour found with that ID",404)));case 5:r.status(200).json({status:"success",data:{tour:a}});case 6:case"end":return e.stop()}})}),exports.createTour=catchAsync(function(t,r){var s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.create(t.body));case 2:s=e.sent,r.status(201).json({status:"success",requestedAt:t.requestTime,data:{tour:s}});case 4:case"end":return e.stop()}})}),exports.updateTour=catchAsync(function(t,r,s){var a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.findByIdAndUpdate(t.params.id,t.body,{new:!0,runValidators:!0}));case 2:if(a=e.sent){e.next=5;break}return e.abrupt("return",s(new AppError("No tour found with that ID",404)));case 5:r.status(200).json({status:"success",data:{tour:a}});case 6:case"end":return e.stop()}})}),exports.deleteTour=catchAsync(function(t,r,s){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.findByIdAndDelete(t.params.id));case 2:if(e.sent){e.next=5;break}return e.abrupt("return",s(new AppError("No tour found with that ID",404)));case 5:r.status(204).json({status:"success",requestedAt:t.requestTime,data:null});case 6:case"end":return e.stop()}})}),exports.getTourStats=catchAsync(function(e,t){var r;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.aggregate([{$match:{ratingsAverage:{$gte:4.5}}},{$group:{_id:{$toUpper:"$difficulty"},num:{$sum:1},numRatings:{$sum:"$ratingsQuantity"},avgRating:{$avg:"$ratingsAverage"},avgPrice:{$avg:"$price"},minPrice:{$min:"$price"},maxPrice:{$max:"$price"}}},{$sort:{avgPrice:1}}]));case 2:r=e.sent,t.status(200).json({status:"success",data:{stats:r}});case 4:case"end":return e.stop()}})}),exports.getMonthlyPlan=catchAsync(function(t,r){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s=1*t.params.year,e.next=3,regeneratorRuntime.awrap(Tour.aggregate([{$unwind:"$startDates"},{$match:{startDates:{$gte:new Date("".concat(s,"-01-01")),$lte:new Date("".concat(s,"-12-31"))}}},{$group:{_id:{$month:"$startDates"},numTourStarts:{$sum:1},tours:{$push:"$name"}}},{$addFields:{month:"$_id"}},{$project:{_id:0}},{$sort:{numTourStarts:-1}}]));case 3:a=e.sent,r.status(200).json({status:"success",data:{plan:a}});case 5:case"end":return e.stop()}})});