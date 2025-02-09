const mongoose = require("mongoose")

const tagLineSchema = new mongoose.Schema({
    tagLine:{
        type:String,
        required:true
    }
})

const TagLine = mongoose.model("TagLine" ,tagLineSchema)

module.exports = TagLine