const { createService, getService, getServiceById, deleteService, updateService, getServiceByName, getarrowData } = require("../Controllers/ServiceController")
const upload = require("../MiddleWare/Multer")

const ServiceRouter = require("express").Router()

ServiceRouter.post("/add-service", upload.fields([
    { name: "serviceLogo", maxCount: 1 },
    { name: "serviceImage", maxCount: 1 }
]), createService)
ServiceRouter.put("/update-service/:id", upload.fields([
    { name: "serviceLogo", maxCount: 1 },
    { name: "serviceImage", maxCount: 1 }
]), updateService)

ServiceRouter.get("/get-service", getService)
ServiceRouter.get("/get-kundali-service", getarrowData)
ServiceRouter.get("/get-single-service/:id", getServiceById)
ServiceRouter.get("/get-service-by-name/:name", getServiceByName)
ServiceRouter.delete("/delete-service/:id", deleteService)

module.exports = ServiceRouter