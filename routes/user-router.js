const userRouter = require("express").Router();
const getUserByID = require('../controller/user-controller')

userRouter
    .route('/:username')
    .get(getUserByID)

module.exports = userRouter