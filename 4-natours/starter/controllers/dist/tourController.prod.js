"use strict";var fs=require("fs"),tours=JSON.parse(fs.readFileSync("".concat(__dirname,"/../dev-data/data/tours-simple.json")));exports.getAllTours=function(s,t){console.log(s.requestTime),t.status(200).json({status:"success",results:tours.length,data:{tours:tours}})},exports.getTour=function(s,t){var a=1*s.params.id,u=tours.find(function(s){return s.id===a});if(!u)return t.status(404).json({status:"fail",message:"Invalid ID"});t.status(200).json({status:"success",data:{tour:u}})},exports.createTour=function(s,t){var a=tours[tours.length-1].id+1,u=Object.assign({id:a},s.body);tours.push(u),fs.writeFile("".concat(__dirname,"/dev-data/data/tours-simple.json"),JSON.stringify(tours),function(s){t.status(201).json({status:"success",data:{tour:u}})})},exports.updateTour=function(s,t){if(1*s.params.id>tours.length)return t.status(404).json({status:"fail",message:"Invalid ID"});t.status(200).json({status:"success",data:{tour:"<Updated tour here>"}})},exports.deleteTour=function(s,t){if(1*s.params.id>tours.length)return t.status(404).json({status:"fail",message:"Invalid ID"});t.status(200).json({status:"success",data:null})};