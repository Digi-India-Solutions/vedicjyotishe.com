const mongoose = require("mongoose")

const GetInTouchSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
},{timestamps:true})

const GetInTouch = mongoose.model("GetInTouch" ,GetInTouchSchema)

module.exports = GetInTouch