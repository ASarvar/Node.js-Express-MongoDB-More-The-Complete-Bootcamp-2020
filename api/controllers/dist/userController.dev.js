"use strict";

var User = require('./../models/userModel');

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var factory = require('./handlerFactory');

var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = function (req, res, next) {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(function _callee(req, res, next) {
  var filteredBody, updatedUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.file);
          console.log(req.body); // 1) Create error if user POSTs password data

          if (!(req.body.password || req.body.passwordConfirm)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400)));

        case 4:
          // 2) Filtered out unwanted field names that are not allowed to be updated
          filteredBody = filterObj(req.body, 'name', 'email'); // 3) Update user document

          _context.next = 7;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, filteredBody, {
            "new": true,
            runValidators: true
          }));

        case 7:
          updatedUser = _context.sent;
          res.status(200).json({
            status: 'success',
            user: updatedUser
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.deleteMe = catchAsync(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          res.status(204).json({
            status: 'success',
            data: null
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: 'This route is not yet defined! Please use sign up instead😏'
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User); // Do NOT update passwords with this

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);