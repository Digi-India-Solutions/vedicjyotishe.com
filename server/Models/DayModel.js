const mongoose = require("mongoose")

const daySchema = new mongoose.Schema({
    sunRiseTime:{
        type:String,
        require:true
    },
    sunsetTime:{
        type:String,
        require:true
    },
    moonRiseTime:{
        type:String,
        require:true
    },
    moonsetTime:{
        type:String,
        require:true
    }
},{timestamps:true})

const Day = mongoose.model("Day" ,daySchema)

module.exports = Day