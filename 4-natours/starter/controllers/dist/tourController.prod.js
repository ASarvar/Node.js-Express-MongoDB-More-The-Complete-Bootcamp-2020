"use strict";function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,s)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var mongoose=require("mongoose"),Tour=require("./../models/tourModel");exports.getAllTours=function(t,r){var s,n,a,u,o,c,i,p,l;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=_objectSpread({},t.query),["page","sort","limit","fields"].forEach(function(e){return delete s[e]}),n=(n=JSON.stringify(s)).replace(/\b(gte|gt|lte|lt)\b/g,function(e){return"$".concat(e)}),a=Tour.find(JSON.parse(n)),a=t.query.sort?(u=t.query.sort.split(",").join(" "),a.sort(u)):a.sort("-createdAt"),a=t.query.fields?(o=t.query.fields.split(",").join(" "),a.select(o)):a.select("-__v"),c=1*t.query.page||1,i=1*t.query.limit||100,p=(c-1)*i,a=a.skip(p).limit(i),t.query.page)return e.next=16,regeneratorRuntime.awrap(Tour.countDocuments());e.next=18;break;case 16:e.sent<=p&&throwError("This page does not exist 😏");case 18:return e.next=20,regeneratorRuntime.awrap(a);case 20:l=e.sent,r.status(200).json({status:"success",requestedAt:t.requestTime,results:l.length,data:{tours:l}}),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(0),r.status(400).json({status:"fail",message:e.t0});case 27:case"end":return e.stop()}},null,null,[[0,24]])},exports.getTour=function(t,r){var s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.findById(t.params.id));case 3:s=e.sent,r.status(200).json({status:"success",data:{tour:s}}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),r.status(400).json({status:"fail",message:e.t0});case 10:case"end":return e.stop()}},null,null,[[0,7]])},exports.createTour=function(t,r){var s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.create(t.body));case 3:s=e.sent,r.status(201).json({status:"success",requestedAt:t.requestTime,data:{tour:s}}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),r.status(400).json({status:"fail",message:"".concat(e.t0," 😅")});case 10:case"end":return e.stop()}},null,null,[[0,7]])},exports.updateTour=function(t,r){var s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.findByIdAndUpdate(t.params.id,t.body,{new:!0,runValidators:!0}));case 3:s=e.sent,r.status(200).json({status:"success",data:{tour:s}}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),r.status(404).json({status:"fail",message:e.t0});case 10:case"end":return e.stop()}},null,null,[[0,7]])},exports.deleteTour=function(t,r){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.findByIdAndDelete(t.params.id));case 3:r.status(200).json({status:"success",requestedAt:t.requestTime,data:null}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),r.status(404).json({status:"fail",message:e.t0});case 9:case"end":return e.stop()}},null,null,[[0,6]])};