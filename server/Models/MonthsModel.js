const mongoose = require("mongoose")

const monthSchema = new mongoose.Schema({
    Amanta: {
        type: String,
        required: true
    },
    Purnimanta: {
        type: String,
        required: true
    },
    Tithi: {
        type: String,
        required: true
    },
    TithiTill: {
        type: String,
        required: true
    },
    Yog: {
        type: String,
        required: true
    },
    YogTill: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Month = mongoose.model("Months", monthSchema)

module.exports = Month