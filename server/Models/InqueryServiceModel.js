const mongoose = require("mongoose")

const InqueryServiceSchema = new mongoose.Schema({
    serviceId:{
        type: mongoose.Schema.ObjectId,
        ref:"Service",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    birthTime: {
        type: String,
        required: true
    },
    countryOrstate: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        // required: true
    },
    latitude: {
        type: String,
        // required: true
    },
    comment: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    appartment: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    addiitionalInfo: {
        type: String,
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    amount: {
        type: Number,
    },
    orderId: {
        type: String,
    },
    paymentId: {
        type: String,
    }
}, { timestamps: true })


const InqueryService = mongoose.model("Inquery-service", InqueryServiceSchema)

module.exports = InqueryService