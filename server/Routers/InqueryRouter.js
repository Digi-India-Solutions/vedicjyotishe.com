const { createInqueryService, getAllInqueries, deleteInquery, verifyPayment } = require("../Controllers/InqueryServiceController")

const InqueryRouter = require("express").Router()

InqueryRouter.post("/send-service-inquery" ,createInqueryService)
InqueryRouter.get("/get-service-inquery" ,getAllInqueries)
InqueryRouter.delete("/delete-service-inquery/:id" ,deleteInquery)

InqueryRouter.post("/verify-payment", verifyPayment);

module.exports = InqueryRouter