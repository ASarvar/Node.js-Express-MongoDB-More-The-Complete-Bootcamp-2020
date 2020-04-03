"use strict";var jwt=require("jsonwebtoken"),User=require("../models/userModel"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),signToken=function(e){return jwt.sign({id:e},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})};exports.signup=catchAsync(function(r,s){var n,t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.create({name:r.body.name,email:r.body.email,password:r.body.password,passwordConfirm:r.body.passwordConfirm}));case 2:n=e.sent,t=signToken(n._id),s.status(201).json({status:"success",token:t,data:{user:n}});case 5:case"end":return e.stop()}})}),exports.login=catchAsync(function(r,s,n){var t,a,o,c,i;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.body,a=t.email,o=t.password,a&&o){e.next=3;break}return e.abrupt("return",n(new AppError("Please provide email and password!",400)));case 3:return e.next=5,regeneratorRuntime.awrap(User.findOne({email:a}).select("+password"));case 5:if(c=e.sent,e.t0=!c,e.t0){e.next=11;break}return e.next=10,regeneratorRuntime.awrap(c.correctPassword(o,c.password));case 10:e.t0=!e.sent;case 11:if(e.t0)return e.abrupt("return",n(new AppError("Incorrect email or password",401)));e.next=13;break;case 13:i=signToken(c._id),s.status(200).json({status:"success",token:i});case 15:case"end":return e.stop()}})});