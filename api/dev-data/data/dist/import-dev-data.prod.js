"use strict";var chalk=require("chalk"),log=console.log,fs=require("fs"),dotenv=require("dotenv"),mongoose=require("mongoose"),Tour=require("./../../models/tourModel"),User=require("./../../models/userModel"),Review=require("./../../models/reviewModel");dotenv.config({path:"./config.env"});var DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);mongoose.connect(DB,{useNewUrlParser:!0,useCreateIndex:!0,useFindAndModify:!1,useUnifiedTopology:!0}).then(function(e){log("DB Connection Successfully 😁")});var tours=JSON.parse(fs.readFileSync("".concat(__dirname,"/tours.json"),"utf-8")),users=JSON.parse(fs.readFileSync("".concat(__dirname,"/users.json"),"utf-8")),reviews=JSON.parse(fs.readFileSync("".concat(__dirname,"/reviews.json"),"utf-8")),importData=function(){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.create(tours));case 3:return log(chalk.blue("tours created")+chalk.red("!!")),e.next=6,regeneratorRuntime.awrap(User.create(users,{validateBeforeSave:!1}));case 6:return log(chalk.blue("users created")+chalk.red("!!")),e.next=9,regeneratorRuntime.awrap(Review.create(reviews));case 9:log(chalk.blue("reviews created")+chalk.red("!!")),log(chalk.green("Data successfully loaded! 😁")),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),log(e.t0);case 16:process.exit();case 17:case"end":return e.stop()}},null,null,[[0,13]])},deleteData=function(){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.deleteMany());case 3:return log(chalk.blue("tours deleted")+chalk.red("!!")),e.next=6,regeneratorRuntime.awrap(User.deleteMany());case 6:return log(chalk.blue("users deleted")+chalk.red("!!")),e.next=9,regeneratorRuntime.awrap(Review.deleteMany());case 9:log(chalk.blue("reviews deleted")+chalk.red("!!")),log(chalk.green("Data successfully deleted! 😏")),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),log(e.t0);case 16:process.exit();case 17:case"end":return e.stop()}},null,null,[[0,13]])},exportData=function(){var r;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(Tour.find());case 3:(r=e.sent).length&&fs.writeFile("".concat(__dirname,"./tours-simple.json"),JSON.stringify(r),function(e){console.log(e)}),console.log("Dev-data successfully updated! 😁"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:process.exit();case 12:case"end":return e.stop()}},null,null,[[0,8]])};"--import"===process.argv[2]?importData():"--delete"===process.argv[2]?deleteData():"--export"===process.argv[2]&&exportData(),console.log(process.argv);