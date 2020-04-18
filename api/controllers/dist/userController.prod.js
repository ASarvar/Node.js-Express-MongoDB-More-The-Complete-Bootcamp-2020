"use strict";var multer=require("multer"),sharp=require("sharp"),User=require("./../models/userModel"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),factory=require("./handlerFactory"),multerStorage=multer.memoryStorage(),multerFilter=function(e,r,t){r.mimetype.startsWith("image")?t(null,!0):t(new AppError("Not an image! Please upload only images.",400),!1)},upload=multer({storage:multerStorage,fileFilter:multerFilter});exports.uploadUserPhoto=upload.single("photo"),exports.resizeUserPhoto=catchAsync(function(r,e,t){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(r.file){e.next=2;break}return e.abrupt("return",t());case 2:return r.file.filename="user-".concat(r.user.id,"-").concat(Date.now(),".jpeg"),e.next=5,regeneratorRuntime.awrap(sharp(r.file.buffer).resize(500,500).toFormat("jpeg").jpeg({quality:90}).toFile("public/img/users/".concat(r.file.filename)));case 5:t();case 6:case"end":return e.stop()}})});var filterObj=function(r){for(var e=arguments.length,t=new Array(1<e?e-1:0),s=1;s<e;s++)t[s-1]=arguments[s];var a={};return Object.keys(r).forEach(function(e){t.includes(e)&&(a[e]=r[e])}),a};exports.getMe=function(e,r,t){e.params.id=e.user.id,t()},exports.updateMe=catchAsync(function(r,t,s){var a,n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(r.body.password||r.body.passwordConfirm)return e.abrupt("return",s(new AppError("This route is not for password updates. Please use /updateMyPassword",400)));e.next=2;break;case 2:return a=filterObj(r.body,"name","email"),r.file&&(a.photo=r.file.filename),e.next=6,regeneratorRuntime.awrap(User.findByIdAndUpdate(r.user.id,a,{new:!0,runValidators:!0}));case 6:n=e.sent,t.status(200).json({status:"success",user:n});case 8:case"end":return e.stop()}})}),exports.deleteMe=catchAsync(function(r,t){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.findByIdAndUpdate(r.user.id,{active:!1}));case 2:t.status(204).json({status:"success",data:null});case 3:case"end":return e.stop()}})}),exports.createUser=function(e,r){r.status(500).json({status:"error",requestedAt:e.requestTime,message:"This route is not yet defined! Please use sign up instead😏"})},exports.getUser=factory.getOne(User),exports.getAllUsers=factory.getAll(User),exports.updateUser=factory.updateOne(User),exports.deleteUser=factory.deleteOne(User);