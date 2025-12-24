const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["Hindi", "English"],
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Contacted", "Enrolled", "Rejected"]
    }
}, { timestamps: true })

const Enquiry = mongoose.model("Enquiry", enquirySchema)

module.exports = Enquiry
