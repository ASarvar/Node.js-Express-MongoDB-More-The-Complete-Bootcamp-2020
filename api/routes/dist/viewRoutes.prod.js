"use strict";var express=require("express"),viewsController=require("./../controllers/viewsController"),router=express.Router();router.get("/",viewsController.getOverview),router.get("/tour/:slug",viewsController.getTour),module.exports=router;