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
        default: ""
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
    workingProfessional: {
        type: String,
        enum: ["Yes", "No", "Self-employed", "Student", "Homemaker", ""],
        default: ""
    },
    currentRole: {
        type: String,
        default: ""
    },
    studiedAstrology: {
        type: String,
        enum: ["Yes", "No", ""],
        default: ""
    },
    astrologyLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", ""],
        default: ""
    },
    learningPurpose: {
        type: String,
        enum: ["Personal interest", "Professional practice", "Research / advanced study", "Teaching", "Other", ""],
        default: ""
    },
    otherPurpose: {
        type: String,
        default: ""
    },
    timePerWeek: {
        type: String,
        enum: ["2–4 hrs", "4–6 hrs", "6+ hrs", ""],
        default: ""
    },
    preferredDays: {
        type: String,
        enum: ["Weekdays", "Weekends", ""],
        default: ""
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
