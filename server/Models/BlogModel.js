const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    blogHeading: {
        type: String,
        required: true
    },
    blogDetails: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Blog = mongoose.model("Blog" ,BlogSchema)

module.exports = Blog