"use strict";var express=require("express"),morgan=require("morgan"),rateLimit=require("express-rate-limit"),helmet=require("helmet"),mongoSanitize=require("express-mongo-sanitize"),xss=require("xss-clean"),hpp=require("hpp"),AppError=require("./utils/appError"),globalErrorHandler=require("./controllers/errorController"),tourRouter=require("./routes/tourRoutes"),userRouter=require("./routes/userRoutes"),reviewRouter=require("./routes/reviewRoutes"),app=express();app.use(helmet()),"development"===process.env.NODE_ENV&&app.use(morgan("dev"));var limiter=rateLimit({max:100,windowMs:36e5,message:"Too many requests from this IP, please try again in an hour!"});app.use("/api",limiter),app.use(express.json({limit:"10kb"})),app.use(mongoSanitize()),app.use(xss()),app.use(hpp({whitelist:["duration","ratingsAverage","ratingsQuantity","maxGroupSize","difficulty","price"]})),app.use(express.static("".concat(__dirname,"/public"))),app.use(function(e,r,s){e.requestTime=(new Date).toISOString(),s()}),app.use("/api/v1/tours",tourRouter),app.use("/api/v1/users",userRouter),app.use("/api/v1/reviews",reviewRouter),app.all("*",function(e,r,s){s(new AppError("Can't find ".concat(e.originalUrl," on this server!"),404))}),app.use(globalErrorHandler),module.exports=app;