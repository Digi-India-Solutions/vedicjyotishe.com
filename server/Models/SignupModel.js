const mongoose = require("mongoose")

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    passwaord: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    signupStatus: {
        type: String,
        defauls: "Pending"
    },
    otpCreatedAt: {
        type: Date,
        default: Date.now,
        index: { expires: '10m' }
    }
}, { timestamps: true })


const User = mongoose.model("Users", signupSchema)

module.exports = User