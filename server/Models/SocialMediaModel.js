const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    contentHeading: {
        type: String,
        required: true
    },
    contentDetails: {
        type: String,
        required: true
    },
    activeStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const SocialMedia = mongoose.model("SocialMedia", linkSchema)

module.exports = SocialMedia