const mongoose = require("mongoose")

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default:"Pending"
    }
},{timestamps:true})


const NewsLetter = mongoose.model("NewsLetter" , newsLetterSchema)

module.exports = NewsLetter

