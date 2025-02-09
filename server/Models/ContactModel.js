const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    contactStatus: {
        type: String,
        default: "False"
    }
}, { timestamps: true })

const Contact = mongoose.model("Contact" ,ContactSchema)

module.exports = Contact