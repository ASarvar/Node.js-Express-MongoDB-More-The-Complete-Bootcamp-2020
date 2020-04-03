const express = require('express')
// const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('./../controllers/userController')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
