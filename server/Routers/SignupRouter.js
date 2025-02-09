const { createRecord, verifyOtp } = require("../Controllers/SignupController")

const SignupRouter = require("express").Router()

SignupRouter.post("/sign-up" ,createRecord)
SignupRouter.post("/verify-otp" ,verifyOtp)

module.exports = SignupRouter