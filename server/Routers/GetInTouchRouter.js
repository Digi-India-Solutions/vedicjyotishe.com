const { createRecord, updateRecord, getAllRecords, getRecordById, deleteRecord } = require("../Controllers/GetInTouchController")

const GetInTouchRouter = require("express").Router()

GetInTouchRouter.post("/send-record" ,createRecord)
GetInTouchRouter.put("/update-record/:id" ,updateRecord)
GetInTouchRouter.get("/get-record" ,getAllRecords)
GetInTouchRouter.get("/get-single-record/:id" ,getRecordById)
GetInTouchRouter.delete("/delete-record/:id" ,deleteRecord)

module.exports = GetInTouchRouter