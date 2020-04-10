"use strict";var mongoose=require("mongoose"),slugify=require("slugify"),tourSchema=new mongoose.Schema({name:{type:String,required:[!0,"A tour must have a name"],unique:!0,trim:!0,maxlength:[40,"A tour must have less or more than 40 characters"],minlength:[10,"A tour must have less or equal than 10 characters"]},slug:String,duration:{type:Number,required:[!0,"A tour must have a duration"]},maxGroupSize:{type:Number,required:[!0,"A tour must have a max group size"]},difficulty:{type:String,required:[!0,"A tour must have a difficulty"],enum:{values:["easy","medium","difficult"],message:"Difficulty is either: easy, medium or difficult"}},ratingsAverage:{type:Number,default:4.5,min:[1,"Rating must be above 1.0"],max:[5,"Rating must be below 5.0"]},ratingsQuantity:{type:Number,default:0},price:{type:Number,required:[!0,"A tour must have a price"]},priceDiscount:{type:Number,validate:{validator:function(e){return e<this.price},message:"Discount price should be below regular price"}},summary:{type:String,trim:!0,require:[!0,"A tour must have a description"]},description:{type:String,trim:!0},imageCover:{type:String,required:[!0,"A tour must have a cover image"]},images:[String],createdAt:{type:Date,default:Date.now(),select:!1},startDates:[Date],secretTour:{type:Boolean,default:!1},startLocation:{type:{type:String,default:"Point",enum:["Point"]},coordinates:[Number],address:String,description:String,locations:{type:{type:String,default:"Point",enum:["Point"]},coordinates:[Number],address:String,description:String,day:Number}},guides:[{type:mongoose.Schema.ObjectId,ref:"User"}]},{toJSON:{virtuals:!0},toObject:{virtuals:!0}});tourSchema.index({price:1,ratingsAverage:-1}),tourSchema.index({slug:1}),tourSchema.virtual("durationWeeks").get(function(){return this.duration/7}),tourSchema.virtual("reviews",{ref:"Review",foreignField:"tour",localField:"_id"}),tourSchema.pre("save",function(e){this.slug=slugify(this.name,{lower:!0}),e()}),tourSchema.pre(/^find/,function(e){this.find({secretTour:{$ne:!0}}),this.start=Date.now(),e()}),tourSchema.pre(/^find/,function(e){this.populate({path:"guides",select:"-__v -passwordChangedAt"}),e()}),tourSchema.post(/^find/,function(e,t){console.log("Query took ".concat(Date.now()-this.start," milliseconds!")),t()}),tourSchema.pre("aggregate",function(e){this.pipeline().unshift({$match:{secretTour:{$ne:!0}}}),e()});var Tour=mongoose.model("Tour",tourSchema);module.exports=Tour;