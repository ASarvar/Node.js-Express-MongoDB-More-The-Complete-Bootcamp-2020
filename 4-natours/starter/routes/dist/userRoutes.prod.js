"use strict";var express=require("express"),userController=require("./../controllers/userController"),router=express.Router();router.route("/").get(getAllUsers).post(createUser),router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser),module.exports=router;