const mongoose = require("mongoose")

const samvatSchema = new mongoose.Schema({
    Vikram: {
        type: String,
        required: true
    },
    Shaka: {
        type: String,
        required: true
    },
    Nakshatra: {
        type: String,
        required: true
    },
    NakshatraTill: {
        type: String,
        required: true
    },
    Karan: {
        type: String,
        required: true
    },
    KaranTill: {
        type: String,
        required: true
    }
}, { timestamps: true })
const Samvat = mongoose.model("Samvat", samvatSchema)


module.exports = Samvat