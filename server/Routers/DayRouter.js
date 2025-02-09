const { createDay, getRecord, getSingleRecord, editDay, deleteDay } = require("../Controllers/DayController")

const DayRouter = require("express").Router()

DayRouter.post("/create-day" , createDay)
DayRouter.get("/get-day" , getRecord)
DayRouter.get("/get-day/:id" , getSingleRecord)
DayRouter.put("/update-day/:id" , editDay)
DayRouter.delete("/delete-day/:id" , deleteDay)

module.exports = DayRouter