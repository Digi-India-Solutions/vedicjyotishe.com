const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceHeading: {
        type: String,
        required: true
    },
    serviceDetails: {
        type: String,
        required: true
    },
    sericePrice: {
        type: Number,
        required: true
    },
    sericeDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    sericeFinalPrice: {
        type: Number,
        required: true
    },
    serviceLogo: {
        type: String,
        required: true
    },
    serviceImage: {
        type: String,
        required: true
    },
    dropDownStatus: {
        type: String,
        default: "False"
    }
}, { timestamps: true })

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service