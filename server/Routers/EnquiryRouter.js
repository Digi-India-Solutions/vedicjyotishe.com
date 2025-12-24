const { createEnquiry, getEnquiry, getEnquiryById, updateEnquiry, deleteEnquiry } = require("../Controllers/EnquiryController")

const EnquiryRouter = require("express").Router()

EnquiryRouter.post("/add-enquiry", createEnquiry)
EnquiryRouter.get("/get-enquiry", getEnquiry)
EnquiryRouter.get("/get-single-enquiry/:id", getEnquiryById)
EnquiryRouter.put("/update-enquiry/:id", updateEnquiry)
EnquiryRouter.delete("/delete-enquiry/:id", deleteEnquiry)

module.exports = EnquiryRouter
