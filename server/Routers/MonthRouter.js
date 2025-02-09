const { createMonths, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../Controllers/MonthsController")

const MonthsRouter = require("express").Router()

MonthsRouter.post("/create-month", createMonths)
MonthsRouter.get("/get-month", getRecord)
MonthsRouter.get("/get-month/:id", getSingleRecord);
MonthsRouter.put("/update-month/:id", updateRecord);
MonthsRouter.delete("/delete-month/:id", deleteRecord);

module.exports = MonthsRouter