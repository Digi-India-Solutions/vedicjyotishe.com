const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    courseHeading: {
        type: String,
        required: true
    },
    courseDetails: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    courseDiscount: {
        type: Number,
        default: 0
    },
    courseFinalPrice: {
        type: Number,
        required: true
    },
    courseLogo: {
        type: String,
        required: true
    },
    courseImage: {
        type: String,
        required: true
    },
    dropDownStatus: {
        type: String,
        default: "False"
    }
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)

module.exports = Course
