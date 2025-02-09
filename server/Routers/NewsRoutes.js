const express = require("express");
const { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord } = require("../Controllers/NewsLetterController");
const NewsLetterRouter = express.Router();

NewsLetterRouter.post("/create-newsletter", createRecord);         // Create a record
NewsLetterRouter.get("/get-newsletter", getAllRecords);         // Read all records
NewsLetterRouter.get("/get-single-newsletter/:id", getRecordById);     // Read a single record
NewsLetterRouter.put("/update-newsletter/:id", updateRecord);      // Update a record
NewsLetterRouter.delete("/delete-newsletter/:id", deleteRecord);   // Delete a record

module.exports = NewsLetterRouter;
